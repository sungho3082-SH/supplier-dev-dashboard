# 이전 버전: 엑셀 + PowerShell 생성기

회사 네트워크에서 Google 서비스가 막혀, 엑셀을 원본으로 두고 HTML을 만들어 내는 방식으로 운영했습니다.

1. 엑셀(`부품`, `일정` 시트)에 일정 · 이슈를 입력
2. `Generate.bat` 더블클릭 → `Generate.ps1`(PowerShell)이 엑셀을 읽어 데이터가 들어간 HTML 한 파일을 생성
3. 생성된 HTML을 팀에 공유 (서버 없이 파일 하나로 열림)

`Generate.ps1` 원본과 실제 엑셀은 회사 자료라 이 저장소에 넣지 않았습니다.
엑셀 형식은 `tools/excel_to_supabase.py` 설명에 적어 두었습니다.
