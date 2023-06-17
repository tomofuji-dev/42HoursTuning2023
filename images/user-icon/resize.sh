#!/bin/bash

shopt -s globstar nullglob
for file in ./**/*.{jpg,jpeg,png,gif,bmp}; do
    convert "$file" -resize 500x500 "./resize/$file"
done
