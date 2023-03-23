/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    PROJECT_ID : "e283e02dc6922cf2ea683a1414f04c39",
    FUJI_PROVIDER : "https://api.avax-test.network/ext/bc/C/rpc",
    MAINNET_PROVIDER : "https://api.avax.network/ext/bc/C/rpc",
    FUJI_SIGNER : "e6a4396a08e092b33d47b60acd5b1ff7c3a57f21f560c4b60c1c9704f700cd78",
    MAINNET_SIGNER : "d8accd78ff28f727f06d768ec35ad3cf50496e8000535bf7d3365f317a5b2635",
    FUJI_ADDRESS : "0x068c3B5E061E9F48dCC1B2474644597286CeB48a",
    MAINNET_ADDRESS : "0x871370A0cDFE75806c11A94Db0FD80FB2f4bfB6A"
  }
}

module.exports = nextConfig
