import type { Messages } from '../types';

const ko: Messages = {
  'app.title': '텍스트 차이 비교',

  'opt.ignoreWhitespace': '공백 문자 무시',
  'opt.ignoreCase': '대소문자 무시',
  'opt.showWhitespace': '공백 기호 표시',

  'view.label': '보기',
  'view.split': '나란히',
  'view.unified': '통합',

  'btn.compare': '비교',
  'btn.prev': '이전 차이',
  'btn.next': '다음 차이',
  'btn.exportHtml': 'HTML 내보내기',
  'btn.exportPdf': 'PDF 내보내기',
  'btn.exportCsv': 'CSV 내보내기',
  'btn.pickFile': '파일 선택',

  'editor.leftName': '왼쪽 텍스트',
  'editor.rightName': '오른쪽 텍스트',
  'editor.leftPlaceholder':
    '여기에 왼쪽 텍스트를 붙여넣거나 입력하세요. 파일을 이 영역으로 끌어다 놓아도 됩니다…',
  'editor.rightPlaceholder':
    '여기에 오른쪽 텍스트를 붙여넣거나 입력하세요. 파일을 이 영역으로 끌어다 놓아도 됩니다…',

  'head.left': '왼쪽',
  'head.right': '오른쪽',
  'head.lineNo': '줄 번호(왼쪽 / 오른쪽)',
  'head.content': '내용',

  'result.placeholder': '비교 결과가 여기에 표시됩니다',
  'toast.pdfHint': '인쇄 대화 상자를 열었습니다. 대상에서 “PDF로 저장”을 선택해 내보내세요.',

  'counter.none': '차이 없음',
  'counter.partial': '{index} / {total}번째 차이',
  'counter.total': '차이 {total}개',

  'lang.label': '언어',

  'report.docTitle': '차이 비교 보고서 - {left} vs {right}',
  'report.heading': '텍스트 차이 비교 보고서',
  'report.generatedAt': '생성 시간: {time}',
  'report.filesLine': '왼쪽: {left}({leftLines}줄)　오른쪽: {right}({rightLines}줄)',
  'report.ignoreLine': '무시 옵션: {options}',
  'report.optNone': '없음',
  'report.optSeparator': ', ',

  'report.summary.total': '총 차이: <b>{n}</b>개',
  'report.summary.modified': '수정된 줄: <b>{n}</b>',
  'report.summary.added': '추가된 줄: <b>{n}</b>',
  'report.summary.removed': '삭제된 줄: <b>{n}</b>',
  'report.summary.equal': '동일한 줄: <b>{n}</b>',

  'report.legend.modified': '수정',
  'report.legend.added': '추가',
  'report.legend.removed': '삭제',
  'report.noDiff': '차이 없음',

  'csv.header.type': '유형',
  'csv.header.leftNo': '왼쪽 줄 번호',
  'csv.header.leftContent': '왼쪽 내용',
  'csv.header.rightNo': '오른쪽 줄 번호',
  'csv.header.rightContent': '오른쪽 내용',

  'csv.status.equal': '동일',
  'csv.status.modified': '수정',
  'csv.status.added': '추가',
  'csv.status.removed': '삭제',
  'csv.status.empty': '비어 있음',
};

export default ko;
