import re
import os
import sys

# ================= 配置区域 =================
if len(sys.argv) > 1:
    FILE_BODY = sys.argv[1]
    if FILE_BODY.endswith('.yaml') or FILE_BODY.endswith('.yml'):
        FILE_BODY = os.path.splitext(FILE_BODY)[0]
else:
    FILE_BODY = 'direct' # 默认文件名

INPUT_FILE = f'{FILE_BODY}.yaml'
OUTPUT_FILE = f'cleaned_{FILE_BODY}.yaml'

print(f"正在处理文件: {INPUT_FILE} ...")
# ===========================================

def extract_rule_info(line):
    """
    返回: (Type, Domain, Policy, Original_Line)
    Policy 如果为 None，说明是 Payload 格式（无策略）
    """
    line = line.strip()
    if line.startswith('#') or not line:
        return None, None, None, line

    # 1. 匹配 Payload 格式: - '+.baidu.com' (无策略)
    match_payload = re.search(r"^-\s*(['\"]?)\+\.([^'\"\s]+)\1", line)
    if match_payload:
        return 'SUFFIX', match_payload.group(2).strip(), 'PAYLOAD_DEFAULT', line

    match_payload_exact = re.search(r"^-\s*(['\"]?)([^'\"\s]+)\1", line)
    if match_payload_exact:
        # 简单过滤排除掉 looks like regex or ip
        d = match_payload_exact.group(2).strip()
        if '.' in d and not re.search(r'[/:,]', d):
            return 'EXACT', d, 'PAYLOAD_DEFAULT', line

    # 2. 匹配 Rules 格式: - DOMAIN-SUFFIX,baidu.com,DIRECT (有策略)
    # Group 1: Type, Group 2: Domain, Group 3: Policy
    match_rule = re.search(r'-\s*(DOMAIN-SUFFIX|DOMAIN)\s*,\s*([^,]+)\s*,\s*([^,]+)', line, re.IGNORECASE)
    if match_rule:
        r_type = match_rule.group(1).upper()
        domain = match_rule.group(2).strip()
        policy = match_rule.group(3).strip() # 提取策略！
        
        if domain.startswith('+.'):
            return 'SUFFIX', domain[2:], policy, line
        
        if r_type == 'DOMAIN-SUFFIX':
            return 'SUFFIX', domain, policy, line
        else:
            return 'EXACT', domain, policy, line

    return None, None, None, line

def clean_rules():
    if not os.path.exists(INPUT_FILE):
        print(f"错误: 找不到文件 {INPUT_FILE}")
        return

    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    kept_lines = []
    
    # 字典结构变化: { 'baidu.com': {'PAYLOAD_DEFAULT'}, 'google.com': {'DIRECT', 'PROXY'} }
    # 因为同一个根域名可能对应多个不同的策略（虽然少见，但逻辑上要支持）
    suffix_roots = {} 

    print("正在分析规则库...")

    # --- 第一遍：建立权威库 (带策略) ---
    for line in lines:
        r_type, domain, policy, _ = extract_rule_info(line)
        if r_type == 'SUFFIX':
            if domain not in suffix_roots:
                suffix_roots[domain] = set()
            suffix_roots[domain].add(policy)

    print(f"发现 {len(suffix_roots)} 个根后缀域名。")

    redundant_count = 0

    # --- 第二遍：去重 ---
    for line in lines:
        r_type, domain, policy, raw_line = extract_rule_info(line)

        if not domain:
            kept_lines.append(line)
            continue

        is_redundant = False
        
        parts = domain.split('.')
        
        # 检查每一级父域名
        for i in range(len(parts) - 1):
            parent = ".".join(parts[i+1:])
            
            # 核心修改：不仅要父级存在，而且父级的策略必须和当前策略一致！
            if parent in suffix_roots:
                parent_policies = suffix_roots[parent]
                
                # 如果父级拥有当前域名的策略，或者大家都是 PAYLOAD 文件(默认策略)
                if policy in parent_policies:
                    is_redundant = True
                    # 只有当策略也相同时，才敢删
                    if policy == 'PAYLOAD_DEFAULT':
                        print(f"删除冗余 (Payload): {domain} (被 {parent} 覆盖)")
                    else:
                        print(f"删除冗余 (策略 {policy}): {domain} (被 {parent} 覆盖)")
                    break
                else:
                    # 父级存在，但策略不同！这是一个“例外规则”，必须保留！
                    # 例如：父级是 DIRECT，当前是 REJECT
                    pass 

        # 检查同名覆盖 (DOMAIN vs DOMAIN-SUFFIX)
        if not is_redundant and r_type == 'EXACT' and domain in suffix_roots:
             if policy in suffix_roots[domain]:
                 is_redundant = True
                 print(f"删除冗余: {domain} (被同名后缀规则覆盖)")

        if not is_redundant:
            kept_lines.append(line)
        else:
            redundant_count += 1

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.writelines(kept_lines)

    print(f"-" * 30)
    print(f"清理完成！结果保存至: {OUTPUT_FILE}")
    print(f"共删除了 {redundant_count} 条冗余规则。")

if __name__ == '__main__':
    clean_rules()