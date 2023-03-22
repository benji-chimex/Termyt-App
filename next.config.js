/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    PROJECT_ID : "e283e02dc6922cf2ea683a1414f04c39",
    FUJI_PROVIDER : "https://api.avax-test.network/ext/bc/C/rpc",
    MAINNET_PROVIDER : "https://api.avax.network/ext/bc/C/rpc",
    FUJI_SIGNER : "e6a4396a08e092b33d47b60acd5b1ff7c3a57f21f560c4b60c1c9704f700cd78",
    MAINNET_SIGNER : "d8accd78ff28f727f06d768ec35ad3cf50496e8000535bf7d3365f317a5b2635",
    FUJI_ADDRESS : "0x1eB0dB36cC75CB666097A501CAB71479677ed7cd",
    MAINNET_ADDRESS : "0x0C1F19759C4494E0b6E5e5fEF633759E094fCe65"
  }
}

module.exports = nextConfig
