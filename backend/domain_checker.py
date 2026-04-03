from urllib.parse import urlparse

TRUSTED_DOMAINS = {
    '.edu': {'score': 90, 'grade': 'A', 'reason': '교육기관'},
    '.gov': {'score': 90, 'grade': 'A', 'reason': '정부기관'},
    '.ac.kr': {'score': 85, 'grade': 'A', 'reason': '국내 교육기관'},
    'arxiv.org': {'score': 85, 'grade': 'A', 'reason': '학술 프리프린트'},
    'pubmed.ncbi.nlm.nih.gov': {'score': 95, 'grade': 'A', 'reason': '의학 학술 DB'},
    'scholar.google.com': {'score': 80, 'grade': 'B', 'reason': 'Google Scholar'},
}

UNTRUSTED_KEYWORDS = ['blog', 'tistory', 'naver', 'medium', 'wordpress']

def check_domain(url):
    parsed = urlparse(url)
    hostname = parsed.hostname or ''

    # 신뢰 도메인 체크
    for domain, info in TRUSTED_DOMAINS.items():
        if hostname.endswith(domain) or hostname == domain:
            return {
                'url': url,
                'score': info['score'],
                'grade': info['grade'],
                'reason': info['reason']
            }

    # 비신뢰 키워드 체크
    for keyword in UNTRUSTED_KEYWORDS:
        if keyword in hostname:
            return {
                'url': url,
                'score': 30,
                'grade': 'D',
                'reason': '개인 블로그 또는 비검증 출처'
            }

    # 기본값
    return {
        'url': url,
        'score': 50,
        'grade': 'C',
        'reason': '신뢰도 확인 불가'
    }