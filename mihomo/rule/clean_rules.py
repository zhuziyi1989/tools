import re
import os
import sys

# ================= 配置区域 =================
if len(sys.argv) > 1:
    # 如果命令行传入了参数，就用传入的参数作为文件名
    # 例如: python script.py google
    FILE_BODY = sys.argv[1]
    
    # 容错处理：如果用户不小心输入了 "google.yaml"，去掉后缀
    if FILE_BODY.endswith('.yaml') or FILE_BODY.endswith('.yml'):
        FILE_BODY = os.path.splitext(FILE_BODY)[0]
else:
    # 默认值（如果没有传参数时使用）
    FILE_BODY = 'direct'

INPUT_FILE = f'{FILE_BODY}.yaml'
OUTPUT_FILE = f'{FILE_BODY}_cleaned.yaml'

print(f"正在处理文件: {INPUT_FILE} ...")
# ===========================================

# ... (后面的 def extract_domain_info 等代码保持不变)

def extract_domain_info(line):
    """
    从行中提取域名信息。
    支持格式 1: - DOMAIN-SUFFIX,google.com,Proxy
    支持格式 2: - '+.google.com'
    支持格式 3: - 'google.com' (视为精确匹配，不作为根)
    """
    line = line.strip()
    # 忽略注释
    if line.startswith('#'):
        return None, None, None

    # --- 匹配模式 A: payload 格式 (- '+.domain') ---
    # 匹配: - '+.baidu.com' 或 - +.baidu.com
    match_payload = re.search(r"^-\s*(['\"]?)\+\.([^'\"\s]+)\1", line)
    if match_payload:
        # 提取域名，例如 baidu.com
        domain = match_payload.group(2).strip()
        return 'SUFFIX', domain, line

    # --- 匹配模式 B: 普通 DOMAIN-SUFFIX 格式 ---
    match_old = re.search(r'-\s*(DOMAIN-SUFFIX|DOMAIN)\s*,\s*([^,]+)', line, re.IGNORECASE)
    if match_old:
        rule_type = match_old.group(1).upper()
        domain = match_old.group(2).strip()
        # 处理旧格式里的 +. 写法
        if domain.startswith('+.'):
            return 'SUFFIX', domain[2:], line
        
        if rule_type == 'DOMAIN-SUFFIX':
            return 'SUFFIX', domain, line
        else:
            return 'EXACT', domain, line

    # --- 匹配模式 C: payload 纯域名 (- 'baidu.com') ---
    # 这种通常视为精确匹配，或者根据上下文。这里保守处理，只提取
    match_payload_plain = re.search(r"^-\s*(['\"]?)([^'\"\s]+)\1", line)
    if match_payload_plain:
        domain = match_payload_plain.group(2).strip()
        # 排除掉看起来像 IP 的或者带有特殊字符的
        if '.' in domain and not re.search(r'[/:,]', domain):
            return 'EXACT', domain, line

    return None, None, None

def clean_rules():
    if not os.path.exists(INPUT_FILE):
        print(f"错误: 找不到文件 {INPUT_FILE}")
        return

    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    kept_lines = []
    suffix_roots = set()

    print("正在分析规则库...")

    # --- 第一遍扫描：建立“根域名”数据库 ---
    for line in lines:
        r_type, domain, _ = extract_domain_info(line)
        if r_type == 'SUFFIX':
            suffix_roots.add(domain)

    print(f"发现 {len(suffix_roots)} 个根后缀规则 (如 apple.com)。")

    redundant_count = 0

    # --- 第二遍扫描：执行去重 ---
    for line in lines:
        r_type, domain, raw_line = extract_domain_info(line)

        # 如果这一行根本不是规则（比如 "payload:" 或者注释），直接保留
        if not domain:
            kept_lines.append(line)
            continue

        is_redundant = False

        # 检查逻辑：
        # 如果当前域名是 a.b.com，我们要检查 b.com 或 com 是否在 suffix_roots 里
        
        parts = domain.split('.')
        # 从顶级域向下一级级组合，检查是否被“根”覆盖
        # 例如 map.baidu.com -> 检查 baidu.com
        
        for i in range(len(parts) - 1):
            parent = ".".join(parts[i+1:])
            if parent in suffix_roots:
                # 找到了父级！
                # 只有一种情况例外：父级就是我自己 (apple.com 覆盖 apple.com 是合理的，保留自己)
                # 但如果是 payload 格式，通常不重复写。我们只删除“子域名”。
                is_redundant = True
                print(f"删除冗余: {domain} (被 {parent} 覆盖)")
                break
        
        # 特殊情况：如果当前是精确匹配 (EXACT)，但存在同名的 SUFFIX 根
        # 比如：- 'baidu.com'  且存在 - '+.baidu.com'
        if not is_redundant and r_type == 'EXACT' and domain in suffix_roots:
             is_redundant = True
             print(f"删除冗余: {domain} (被同名后缀规则覆盖)")

        # 只有在它是子域名，且被父级 SUFFIX 覆盖时才删除
        # 如果我自己就是 SUFFIX (apple.com)，且没有更短的父级 (com)，则保留
        
        if not is_redundant:
            kept_lines.append(line)
        else:
            redundant_count += 1

    # --- 写入文件 ---
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.writelines(kept_lines)

    print(f"-" * 30)
    print(f"清理完成！已生成: {OUTPUT_FILE}")
    print(f"共删除了 {redundant_count} 条冗余规则。")

if __name__ == '__main__':
    clean_rules()