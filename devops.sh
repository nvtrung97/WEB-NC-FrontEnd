echo "[start]: Build project..."
echo "[start]: Build admin..."
cd admin && rm -r build && npm run build
cd ..
echo "[end]: End Build admin"

echo "[start]: Build lecturer..."
cd lecture && rm -r build
npm run build
cd ..
echo "[end]: End Build lecturer"

echo "[start]: Build app..."
cd app && rm -r build
npm run build
cd ..
echo "[end]: End Build app"
cp .htaccess ./app/build/
cp .htaccess ./lecture/build/
cp .htaccess ./admin/build/
echo "[remove]: Removing old file in server..."
ssh root@157.230.255.139 "rm -r /var/www/html/webnc && mkdir /var/www/html/webnc && mkdir /var/www/html/webnc/admin && mkdir /var/www/html/webnc/lecture && mkdir /var/www/html/webnc/app && sudo chmod -R 777 /var/www/html/webnc"
echo "[start]: Upload to server..."
scp -r admin/build root@157.230.255.139:/var/www/html/webnc/admin
scp -r lecture/build root@157.230.255.139:/var/www/html/webnc/lecture
scp -r app/build root@157.230.255.139:/var/www/html/webnc/app
echo "[Done]: End Build app"

