#!/bin/bash
python3 -m venv ./venv
source venv/bin/activate
python --version
pip install -r requirements.txt
pip install -r requirements-mac.txt
cd ui
nvm use 16.13.2
npm install
cd ..