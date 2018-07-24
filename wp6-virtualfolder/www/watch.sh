while inotifywait -e close_write -r `pwd`; do au build --env prod; done
