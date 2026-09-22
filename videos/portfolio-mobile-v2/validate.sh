set -e
python3 soundtrack.py
npx --no-install hyperframes lint
npx --no-install hyperframes check
