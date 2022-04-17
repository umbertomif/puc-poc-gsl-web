echo "Starting application..."

envsubst < "/usr/share/nginx/html/assets/settings.json" > "/usr/share/nginx/html/assets/settings.tmp.json" && mv "/usr/share/nginx/html/assets/settings.tmp.json" "/usr/share/nginx/html/assets/settings.json"
nginx -g 'daemon off;'
