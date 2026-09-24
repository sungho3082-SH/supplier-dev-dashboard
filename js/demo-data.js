// 공개용 데모 데이터: 차종 · 협력사 · 품번 · 공장명은 가명, 일정 날짜는 실제 값
window.DEMO_DATA={
 "projects": [
  {
   "id": 1,
   "carModel": "AA1",
   "supplier": "협력사 A",
   "partNo": "CHL-AA1-001",
   "partName": "CHILLER ASY",
   "step": "P2",
   "openIssue": "(07/02)\n공정점검 실시 · 지적사항 13건 (완료 7 / 진행 6)\n대표 지적: Plate 찍힘으로 인한 브레이징 용접 누락 우려, Flux 공정 관리 미흡\n\n(07/15)\n공정감사 결과 리뷰, Brazing 점검 일정 확정 및 생산계획 반영\n\n(07/21)\nFull CAPA 점검 지적사항\n-. 작업표준서) Brazing 온도 · 컨베이어 속도 기준 미반영\n    ㄴ모델별 관리계획서 반영 요청\n-. 관리계획서) Fixture 체결 공정 Stroke · 속도 제어 누락, 이종혼입 방지 대책 미반영\n-. FMEA) 코킹 공정 불량 유형 분석 미흡\n    ㄴ현장에서 실제 발생하는 유형을 FMEA · CP에 반영 요청\n-. Plate 역조립) 후공정 검출에만 의존\n    ㄴ해당 공정 내 방지 대책 요청\n-. CAPA 분석) 실제 작업자 기준 C/T 재산출 필요\n-. 헬륨 리크 마스터 이상 → 재교정 요청\n\n(09/03)\nStudy: 리크 테스트 방식(감압 / 차압), Flux 농도 관리 기준",
   "supplyChain": "협력사 A→공장1→공장2",
   "issueGroup": "G2",
   "schedule": {
    "protoStart": "2024-10-15",
    "p1Start": "2025-09-15",
    "p2Start": "2026-03-10",
    "mStart": "2026-07-15",
    "sopStart": "2026-09-15"
   },
   "checkpoints": {
    "allTool": "2025-08-30",
    "fullTool": "2026-02-02",
    "audit": "2026-06-18",
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 2,
   "carModel": "AA1",
   "supplier": "협력사 A",
   "partNo": "COND-AA1-002",
   "partName": "WATER COND ASY",
   "step": "P2",
   "openIssue": "(07/02)\n공정점검 실시 · 지적사항 13건 (완료 7 / 진행 6)\n대표 지적: Plate 찍힘으로 인한 브레이징 용접 누락 우려, Flux 공정 관리 미흡\n\n(07/15)\n공정감사 결과 리뷰, Brazing 점검 일정 확정 및 생산계획 반영\n\n(07/21)\nFull CAPA 점검 지적사항\n-. 작업표준서) Brazing 온도 · 컨베이어 속도 기준 미반영\n    ㄴ모델별 관리계획서 반영 요청\n-. 관리계획서) Fixture 체결 공정 Stroke · 속도 제어 누락, 이종혼입 방지 대책 미반영\n-. FMEA) 코킹 공정 불량 유형 분석 미흡\n    ㄴ현장에서 실제 발생하는 유형을 FMEA · CP에 반영 요청\n-. Plate 역조립) 후공정 검출에만 의존\n    ㄴ해당 공정 내 방지 대책 요청\n-. CAPA 분석) 실제 작업자 기준 C/T 재산출 필요\n-. 헬륨 리크 마스터 이상 → 재교정 요청\n\n(09/03)\nStudy: 리크 테스트 방식(감압 / 차압), Flux 농도 관리 기준",
   "supplyChain": "협력사 A→공장1→공장2",
   "issueGroup": "G2",
   "schedule": {
    "protoStart": "2024-10-15",
    "p1Start": "2025-09-15",
    "p2Start": "2026-03-10",
    "mStart": "2026-07-15",
    "sopStart": "2026-09-15"
   },
   "checkpoints": {
    "allTool": "2025-08-30",
    "fullTool": "2026-02-02",
    "audit": "2026-06-18",
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 3,
   "carModel": "AA2",
   "supplier": "협력사 A",
   "partNo": "RAD-AA2-001",
   "partName": "RAD ASY 25.2T, 내염화",
   "step": "P2",
   "openIssue": "(07/02)\nAll Tool: 미완료 2건 (OK 식별 표기 설비 셋업 / Tank 이종혼입 방지 E/P 셋업) → W28 완료 예정\nFull Tool: 지적사항 개선 완료\nFull CAPA: W27 점검 예정\n\n(07/15)\n사급 자재(Tank) 수입검사 불합격 → 금형 수리 진행 중\n그 외 M 공정점검 자재 준비 완료\n공정감사 일정 재조율\n\n(07/23)\n공정감사 예정: 8월 중",
   "supplyChain": "협력사 A→공장2",
   "issueGroup": "G4",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-05",
    "fullTool": "2026-06-30",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 4,
   "carModel": "AA2",
   "supplier": "협력사 A",
   "partNo": "RAD-AA2-002",
   "partName": "RAD ASY 25.2T, 일반",
   "step": "P2",
   "openIssue": "(07/02)\nAll Tool: 미완료 2건 (OK 식별 표기 설비 셋업 / Tank 이종혼입 방지 E/P 셋업) → W28 완료 예정\nFull Tool: 지적사항 개선 완료\nFull CAPA: W27 점검 예정\n\n(07/15)\n사급 자재(Tank) 수입검사 불합격 → 금형 수리 진행 중\n그 외 M 공정점검 자재 준비 완료\n공정감사 일정 재조율\n\n(07/23)\n공정감사 예정: 8월 중",
   "supplyChain": "협력사 A→공장2",
   "issueGroup": "G4",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-05",
    "fullTool": "2026-06-30",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 5,
   "carModel": "AA2",
   "supplier": "협력사 A",
   "partNo": "RAD-AA2-003",
   "partName": "RAD ASY 14T, 내염화",
   "step": "P2",
   "openIssue": "(07/02)\nAll Tool: 미완료 2건 (OK 식별 표기 설비 셋업 / Tank 이종혼입 방지 E/P 셋업) → W28 완료 예정\nFull Tool: 지적사항 개선 완료\nFull CAPA: W27 점검 예정\n\n(07/15)\n사급 자재(Tank) 수입검사 불합격 → 금형 수리 진행 중\n그 외 M 공정점검 자재 준비 완료\n공정감사 일정 재조율\n\n(07/23)\n공정감사 예정: 8월 중",
   "supplyChain": "협력사 A→공장2",
   "issueGroup": "G4",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-05",
    "fullTool": "2026-06-30",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 6,
   "carModel": "AA2",
   "supplier": "협력사 A",
   "partNo": "RAD-AA2-004",
   "partName": "RAD ASY 14T, 일반",
   "step": "P2",
   "openIssue": "(07/02)\nAll Tool: 미완료 2건 (OK 식별 표기 설비 셋업 / Tank 이종혼입 방지 E/P 셋업) → W28 완료 예정\nFull Tool: 지적사항 개선 완료\nFull CAPA: W27 점검 예정\n\n(07/15)\n사급 자재(Tank) 수입검사 불합격 → 금형 수리 진행 중\n그 외 M 공정점검 자재 준비 완료\n공정감사 일정 재조율\n\n(07/23)\n공정감사 예정: 8월 중",
   "supplyChain": "협력사 A→공장2",
   "issueGroup": "G4",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-05",
    "fullTool": "2026-06-30",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 7,
   "carModel": "AA2",
   "supplier": "협력사 A",
   "partNo": "RAD-AA2-005",
   "partName": "RAD ASY 14T, 내염화, TOC 유",
   "step": "P2",
   "openIssue": "(07/02)\nAll Tool: 미완료 2건 (OK 식별 표기 설비 셋업 / Tank 이종혼입 방지 E/P 셋업) → W28 완료 예정\nFull Tool: 지적사항 개선 완료\nFull CAPA: W27 점검 예정\n\n(07/15)\n사급 자재(Tank) 수입검사 불합격 → 금형 수리 진행 중\n그 외 M 공정점검 자재 준비 완료\n공정감사 일정 재조율\n\n(07/23)\n공정감사 예정: 8월 중",
   "supplyChain": "협력사 A→공장2",
   "issueGroup": "G4",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-05",
    "fullTool": "2026-06-30",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 8,
   "carModel": "AA2",
   "supplier": "협력사 A",
   "partNo": "RAD-AA2-006",
   "partName": "RAD ASY 14T, 일반, TOC 무",
   "step": "P2",
   "openIssue": "(07/02)\nAll Tool: 미완료 2건 (OK 식별 표기 설비 셋업 / Tank 이종혼입 방지 E/P 셋업) → W28 완료 예정\nFull Tool: 지적사항 개선 완료\nFull CAPA: W27 점검 예정\n\n(07/15)\n사급 자재(Tank) 수입검사 불합격 → 금형 수리 진행 중\n그 외 M 공정점검 자재 준비 완료\n공정감사 일정 재조율\n\n(07/23)\n공정감사 예정: 8월 중",
   "supplyChain": "협력사 A→공장2",
   "issueGroup": "G4",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-05",
    "fullTool": "2026-06-30",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 9,
   "carModel": "AA2",
   "supplier": "협력사 A",
   "partNo": "RAD-AA2-007",
   "partName": "RAD ASY 31T, 일반, TIER4",
   "step": "P2",
   "openIssue": "(07/02)\nAll Tool: 미완료 2건 (OK 식별 표기 설비 셋업 / Tank 이종혼입 방지 E/P 셋업) → W28 완료 예정\nFull Tool: 지적사항 개선 완료\nFull CAPA: W27 점검 예정\n\n(07/15)\n사급 자재(Tank) 수입검사 불합격 → 금형 수리 진행 중\n그 외 M 공정점검 자재 준비 완료\n공정감사 일정 재조율\n\n(07/23)\n공정감사 예정: 8월 중",
   "supplyChain": "협력사 A→공장2",
   "issueGroup": "G4",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-05",
    "fullTool": "2026-06-30",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 10,
   "carModel": "AA2",
   "supplier": "협력사 A",
   "partNo": "RAD-AA2-008",
   "partName": "RAD ASY 18.5T, 일반, TIER4",
   "step": "P2",
   "openIssue": "(07/02)\nAll Tool: 미완료 2건 (OK 식별 표기 설비 셋업 / Tank 이종혼입 방지 E/P 셋업) → W28 완료 예정\nFull Tool: 지적사항 개선 완료\nFull CAPA: W27 점검 예정\n\n(07/15)\n사급 자재(Tank) 수입검사 불합격 → 금형 수리 진행 중\n그 외 M 공정점검 자재 준비 완료\n공정감사 일정 재조율\n\n(07/23)\n공정감사 예정: 8월 중",
   "supplyChain": "협력사 A→공장2",
   "issueGroup": "G4",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-05",
    "fullTool": "2026-06-30",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 11,
   "carModel": "AA3",
   "supplier": "협력사 A",
   "partNo": "RAD-AA3-001",
   "partName": "RAD ASY 31T",
   "step": "Proto",
   "openIssue": "(Back Ground)\n▷ Header · Support 금형 개발계획서 요청\n   (제품 해석 → 공정 설계 → 금형 설계 → 제작 → Try-out → 승인)\n▷ 샘플 치수 측정 결과 일부 NG → 금형 수정 예정\n   - HEADER: Tube hole 치수 NG\n▷ 소싱 변경 검토 후 기존 협력사로 최종 결정\n\n(07/16)\n▷ Tank Quick Coupler O-ring부 조도 관리 요청\n   ㄴAssy 도면 반영 협의 중",
   "supplyChain": "협력사 A→고객사 X→OEM 공장",
   "issueGroup": null,
   "schedule": {
    "protoStart": "2025-12-15",
    "p1Start": "2026-08-15",
    "p2Start": "2026-11-15",
    "mStart": "2027-01-15",
    "sopStart": "2027-02-15"
   },
   "checkpoints": {
    "allTool": null,
    "fullTool": null,
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 12,
   "carModel": "AA4",
   "supplier": "협력사 B",
   "partNo": "RAD-AA4-001",
   "partName": "RAD ASY 전장RAD (14T, 내염화)",
   "step": "P2",
   "openIssue": null,
   "supplyChain": "협력사 B→공장3",
   "issueGroup": null,
   "schedule": {
    "protoStart": "2025-06-15",
    "p1Start": "2026-03-01",
    "p2Start": "2026-05-15",
    "mStart": null,
    "sopStart": "2026-10-01"
   },
   "checkpoints": {
    "allTool": null,
    "fullTool": null,
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 13,
   "carModel": "AA4",
   "supplier": "협력사 B",
   "partNo": "RAD-AA4-002",
   "partName": "RAD ASY 전장RAD (14T, 내염화)",
   "step": "P2",
   "openIssue": null,
   "supplyChain": "협력사 B→공장3",
   "issueGroup": null,
   "schedule": {
    "protoStart": "2025-06-15",
    "p1Start": "2026-03-01",
    "p2Start": "2026-05-15",
    "mStart": null,
    "sopStart": "2026-10-01"
   },
   "checkpoints": {
    "allTool": null,
    "fullTool": null,
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 14,
   "carModel": "AA5",
   "supplier": "협력사 B",
   "partNo": "RAD-AA5-001",
   "partName": "RAD COMPLETE ASY 내염화, 내수/북미/중국/러시아",
   "step": "P1",
   "openIssue": null,
   "supplyChain": "협력사 B→공장1→공장3",
   "issueGroup": null,
   "schedule": {
    "protoStart": "2025-11-01",
    "p1Start": "2026-06-15",
    "p2Start": "2026-09-01",
    "mStart": "2026-11-01",
    "sopStart": "2026-12-01"
   },
   "checkpoints": {
    "allTool": null,
    "fullTool": null,
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 15,
   "carModel": "AA5",
   "supplier": "협력사 B",
   "partNo": "RAD-AA5-002",
   "partName": "RAD COMPLETE ASY 내염화, 내수/북미/중국/러시아",
   "step": "P1",
   "openIssue": null,
   "supplyChain": "협력사 B→공장1→공장3",
   "issueGroup": null,
   "schedule": {
    "protoStart": "2025-11-01",
    "p1Start": "2026-06-15",
    "p2Start": "2026-09-01",
    "mStart": "2026-11-01",
    "sopStart": "2026-12-01"
   },
   "checkpoints": {
    "allTool": null,
    "fullTool": null,
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 16,
   "carModel": "AA2",
   "supplier": "협력사 B",
   "partNo": "COND-AA2-009",
   "partName": "COND ASY 12T, FF TYPE",
   "step": "P2",
   "openIssue": "(07/02)\nFull Tool 공정감사 · 지적사항 10건 (4건 진행 중)\n주요 지적: 헬륨 리크 설비 연속작업 불가 → 직행률 저하",
   "supplyChain": "협력사 B→공장2",
   "issueGroup": "G17",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-06",
    "fullTool": "2026-07-13",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 17,
   "carModel": "AA2",
   "supplier": "협력사 B",
   "partNo": "COND-AA2-010",
   "partName": "COND ASY 12T, FF TYPE, EURO7",
   "step": "P2",
   "openIssue": "(07/02)\nFull Tool 공정감사 · 지적사항 10건 (4건 진행 중)\n주요 지적: 헬륨 리크 설비 연속작업 불가 → 직행률 저하",
   "supplyChain": "협력사 B→공장2",
   "issueGroup": "G17",
   "schedule": {
    "protoStart": "2025-05-15",
    "p1Start": "2026-01-19",
    "p2Start": "2026-06-01",
    "mStart": "2026-08-01",
    "sopStart": "2026-09-01"
   },
   "checkpoints": {
    "allTool": "2026-02-06",
    "fullTool": "2026-07-13",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 18,
   "carModel": "AA6",
   "supplier": "협력사 B",
   "partNo": "RAD-AA6-001",
   "partName": "RAD ASY 전장RAD (14T)",
   "step": "P1",
   "openIssue": null,
   "supplyChain": "협력사 B→공장1(KD)",
   "issueGroup": null,
   "schedule": {
    "protoStart": "2025-03-15",
    "p1Start": "2026-01-15",
    "p2Start": "2026-08-03",
    "mStart": "2026-10-01",
    "sopStart": "2026-10-15"
   },
   "checkpoints": {
    "allTool": null,
    "fullTool": null,
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 19,
   "carModel": "AA7",
   "supplier": "협력사 C",
   "partNo": "RAD-AA7-001",
   "partName": "RAD ASY 전장 RAD (18.5T)",
   "step": "P1",
   "openIssue": "(07/02)\nAll Tool 공정감사 · 지적사항 11건\n주요 지적: 사출 수분 측정 / Tank 역조립 E/P\n\nTank 역조립 E/P 적용 완료, Leak Test 양산 조건 준비 완료\nSOP 전 Full CAPA · 공정감사 필요",
   "supplyChain": "협력사 C→공장2",
   "issueGroup": null,
   "schedule": {
    "protoStart": "2025-07-06",
    "p1Start": "2026-03-15",
    "p2Start": "2026-08-10",
    "mStart": "2026-11-01",
    "sopStart": "2026-12-15"
   },
   "checkpoints": {
    "allTool": "2026-05-14",
    "fullTool": null,
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  },
  {
   "id": 20,
   "carModel": "AA8",
   "supplier": "협력사 C",
   "partNo": "RAD-AA8-001",
   "partName": "RAD ASY 전장 RAD (25.2T, 내염화)",
   "step": "M",
   "openIssue": "(07/02)\n품질 이슈: 납품품 Core 뒤틀림\n→ Crimping 공정 또는 Brazing fixture 구속으로 개선 검토\n\n(07/16)\nFull CAPA 점검 계획 수립\n-. 공정별 C/T 측정 및 병목 공정 확인\n-. 연간 Volume 대비 120% 생산 가능 여부 점검\n-. 특별특성: Tank 외경, 내부 공기압 기밀",
   "supplyChain": "협력사 C→공장2",
   "issueGroup": null,
   "schedule": {
    "protoStart": "2025-06-07",
    "p1Start": "2026-02-15",
    "p2Start": "2026-05-15",
    "mStart": "2026-08-10",
    "sopStart": "2026-09-15"
   },
   "checkpoints": {
    "allTool": "2026-02-03",
    "fullTool": "2026-05-13",
    "audit": null,
    "fullCapa": null
   },
   "photos": [],
   "volume": null
  }
 ],
 "bom": {
  "AA2": [
   {
    "level": 1,
    "variant": "Cooling",
    "partNo": "AA2-CM-0001",
    "partName": "ENGINE COOLING ASY",
    "nc": "New",
    "plant": "공장2",
    "mb": "Make",
    "supplier": "",
    "remark": ""
   },
   {
    "level": 2,
    "variant": "",
    "partNo": "AA2-RAD-0010",
    "partName": "RAD ASY",
    "nc": "New",
    "plant": "공장2",
    "mb": "Buy",
    "supplier": "협력사 A",
    "remark": ""
   },
   {
    "level": 3,
    "variant": "",
    "partNo": "AA2-RAD-0011",
    "partName": "TANK ASY",
    "nc": "New",
    "plant": "",
    "mb": "Buy",
    "supplier": "협력사 A",
    "remark": "사급"
   },
   {
    "level": 3,
    "variant": "",
    "partNo": "AA2-RAD-0012",
    "partName": "CORE ASY",
    "nc": "New",
    "plant": "",
    "mb": "Buy",
    "supplier": "협력사 A",
    "remark": ""
   },
   {
    "level": 2,
    "variant": "",
    "partNo": "AA2-CND-0020",
    "partName": "COND ASY",
    "nc": "New",
    "plant": "공장2",
    "mb": "Buy",
    "supplier": "협력사 B",
    "remark": ""
   },
   {
    "level": 3,
    "variant": "",
    "partNo": "AA2-CND-0021",
    "partName": "HEADER",
    "nc": "C/over",
    "plant": "",
    "mb": "Buy",
    "supplier": "협력사 B",
    "remark": ""
   },
   {
    "level": 2,
    "variant": "",
    "partNo": "AA2-FAN-0030",
    "partName": "FAN & SHROUD ASY",
    "nc": "C/over",
    "plant": "공장2",
    "mb": "Make",
    "supplier": "",
    "remark": ""
   }
  ],
  "AA1": [
   {
    "level": 1,
    "variant": "Thermal",
    "partNo": "AA1-TM-0001",
    "partName": "THERMAL MODULE ASY",
    "nc": "New",
    "plant": "공장2",
    "mb": "Make",
    "supplier": "",
    "remark": ""
   },
   {
    "level": 2,
    "variant": "",
    "partNo": "AA1-CHL-0010",
    "partName": "CHILLER ASY",
    "nc": "New",
    "plant": "공장1",
    "mb": "Buy",
    "supplier": "협력사 A",
    "remark": ""
   },
   {
    "level": 2,
    "variant": "",
    "partNo": "AA1-WCD-0020",
    "partName": "WATER COND ASY",
    "nc": "New",
    "plant": "공장1",
    "mb": "Buy",
    "supplier": "협력사 A",
    "remark": ""
   },
   {
    "level": 3,
    "variant": "",
    "partNo": "AA1-WCD-0021",
    "partName": "PLATE",
    "nc": "New",
    "plant": "",
    "mb": "Buy",
    "supplier": "협력사 A",
    "remark": ""
   }
  ]
 }
};
