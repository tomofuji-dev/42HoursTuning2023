#!/bin/bash

find . -name "*.png" -exec sh -c 'cwebp -q 10 "$1" -o "./webp/${1%.png}.webp"' _ {} \;
