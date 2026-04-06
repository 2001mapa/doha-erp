#!/bin/bash
npm run dev > npm_output.log 2>&1 &
echo $! > server.pid
