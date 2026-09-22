set -e
npx --no-install hyperframes check
npx --no-install hyperframes snapshot --at 1.1,2.5,5.6,10.5,15.5,20.5,22.88,24.8,28.8 --no-end
