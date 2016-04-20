#!卸载 Node.js 脚本
#!/bin/bash

lsbom -f -l -s -pf /var/db/receipts/org.nodejs.pkg.bom \
| while read i; do
sudo rm /usr/local/${i}
done
sudo rm -rf /usr/local/lib/node \
/usr/local/lib/node_modules \
/var/db/receipts/org.nodejs.*#!/bin/bash

lsbom -f -l -s -pf /var/db/receipts/org.nodejs.pkg.bom \
| while read i; do
sudo rm /usr/local/${i}
done
sudo rm -rf /usr/local/lib/node \
/usr/local/lib/node_modules \
/var/db/receipts/org.nodejs.*