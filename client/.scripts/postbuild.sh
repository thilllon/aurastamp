#!/bin/bash

# rimraf를 사용한 삭제 방식은 예상하는 결과대로 동작하지 않음... build artifacts가 모두 생성되기전에 삭제 명령이 되어서 제대로 파일을 지우지 못하는 걸로 추정. 또한 sourcemaps refs(//#sourceMappingURL=filename.js.map)을 지우지 않으면 자동으로 sourcemaps 다운로드를 시도하기 때문에 resource not found warning이 발생함. 따라서 아래 find 명령어집합을 쓰는것이 좋음.
# rm -r ./.next/**/*.js.map 
# rimraf ./.next/**/*.js.map

## delete sourcemaps
echo "[POST BUILD HOOK] Remove all sourcemap files(*.js.map) to ensure security"
find .next/static -type f -name '*.js.map' -delete
find .next/static -type f -name '*.css.map' -delete

## delete sourcemaps refs
# -i : in-place 수정
# -E : extended regex 사용
# 예시 //# sourceMappingURL=7647-f2a9b1a3180eab3e.js.map

# find .next/static -type f -name '*.js' -exec sed -i -E 's/sourceMappingURL=[^ ]*\.js\.map//g' {} +
# find .next/static -type f -name '*.css' -exec sed -i -E 's/sourceMappingURL=[^ ]*\.css\.map//g' {} +
echo "[POST BUILD HOOK] Remove all source map references in the end of JS files"
find .next/static -type f -name '*.js' -exec sed -i -E 's/\/\/# sourceMappingURL=[^ ]*\.js\.map//g' {} +
find .next/static -type f -name '*.css' -exec sed -i -E 's/\/\/# sourceMappingURL=[^ ]*\.css\.map//g' {} +


## tmp로 바꾼 .babelrc.js 원상 복구
TMP_FILE=.babelrc.js.tmp
FILE=.babelrc.js

if [ -f "$TMP_FILE" ]; then
    echo "[POST BUILD HOOK] Detect temporary file \"$TMP_FILE\""
    if [ -f "$FILE" ]; then 
        rm $FILE
        echo "[POST BUILD HOOK] Remove \"$FILE\""
    fi    
    mv $TMP_FILE $FILE
    echo "[POST BUILD HOOK] Rename \"$TMP_FILE\" to \"$FILE\""
fi
