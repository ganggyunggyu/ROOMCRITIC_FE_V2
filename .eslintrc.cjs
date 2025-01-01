module.exports = {
  // 이 파일이 프로젝트 최상위 ESLint 설정임을 명시
  root: true,

  // 환경 설정: 코드가 실행되는 환경을 정의
  env: {
    browser: true, // 브라우저 환경에서 실행되는 코드
    es2020: true, // ES2020 문법 사용 가능
    node: true, // Node.js 환경도 함께 고려
  },

  // ESLint 기본 규칙 및 추가 규칙 세트
  extends: [
    'eslint:recommended', // ESLint의 권장 기본 규칙
    'plugin:@typescript-eslint/recommended', // TypeScript용 권장 규칙
    'plugin:react-hooks/recommended', // React Hooks 사용 규칙
    'plugin:vue/vue3-recommended', // Vue 3 권장 규칙 세트
    'plugin:prettier/recommended', // Prettier와 ESLint 통합
  ],

  // ESLint가 검사하지 않을 파일/디렉토리
  ignorePatterns: [
    'dist', // 빌드된 파일은 검사 제외
    '.eslintrc.cjs', // 이 설정 파일 자체는 검사 제외
  ],

  // 파서 설정: TypeScript를 지원하는 파서를 지정
  parser: '@typescript-eslint/parser',

  // ESLint 플러그인 활성화
  plugins: [
    'react-refresh', // React Fast Refresh 관련 플러그인
    'vue', // Vue.js 관련 규칙 플러그인
  ],

  // 커스텀 규칙 설정
  rules: {
    // React Fast Refresh: 컴포넌트만 export하도록 경고
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }, // 상수 export는 허용
    ],

    // Vue 컴포넌트 이름 스타일: PascalCase 또는 kebab-case 허용
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { registeredComponentsOnly: true },
    ],

    // Vue 단일 파일 컴포넌트에서 필수 속성 정의
    'vue/require-default-prop': 'error',

    // TypeScript: unused 변수 경고
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // Prettier와 충돌하는 규칙 비활성화
    'prettier/prettier': 'error', // Prettier 규칙 위반 시 에러로 표시
  },
};
