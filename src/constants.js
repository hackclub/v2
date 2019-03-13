export const IS_PROD = process.env.NODE_ENV === 'production'

export const PUBLIC_STRIPE_KEY = IS_PROD
  ? 'pk_live_z9sqsmu2zPUSaCYgLmfoHSNm'
  : 'pk_test_eU1Cn0yK7HTAPZeXjA0uwWL8'
