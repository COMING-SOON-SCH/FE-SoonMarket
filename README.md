# 1. Development Workflow(개발 워크 플로우)
## Branch Strategy(브랜치 전략)
Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.
- main Branch
  - 배포용 코드가 위치하는 안정적인 브랜치
  - 운영 환경에서 사용 가능한 상태여야 함.
- dev Branch
  - 개발용 브랜치
  - 새로운 기능 개발과 통합 작업이 이루어지는 브랜치
- feature/{feature} Branch
  - 기능 단위 개발을 위한 브랜치

# 2. Commit Convention
```\<type>(\<scope>): \<short summary>```
- type: Commit Type(build|ci|docs|feat|fix|perf|refactor|test)
  - build: 빌드 시스템이나 외부 종속성에 영향을 미치는 변경 사항 (예: gulp, broccolim npm)
  - ci: CI 구성 파일 및 스크립트에 대한 변경 사항 (예: Github Actions, SauceLabs)
  - docs: 문서에만 영향을 미치는 변경 사항
  - feat: 새로운 기능 추가
  - fix: 버그 수정
  - perf: 성능을 개선하는 코드 변경
  - refactor: 버그 수정이나 기능 추가와 관련 없는 코드 변경
  - test: 누락된 테스트 추가 또는 기존 테스트 수정
- scope: 어디가 변경되었는지, 변경된 부분 모두
- short summary
  - 명령문, 현재 시제로 작성
  - 마지막에 마침표를 붙이지 말 것

# 3. Coding Convention
다음 Url의 typescript style guide를 따릅니다.

https://radlohead.gitbook.io/typescript-deep-dive/styleguide