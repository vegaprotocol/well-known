# Vega Oracle Profiles

Oracle profiles are an optional, extra layer of information about oracles on the Vega network, including:

- Oracle name
- Description
- URL
- [Proofs](#proofs), like verified social media accounts

Oracle developers can use profiles to explain their methodology and demonstrate their reputation, to build trust.

Apps on the Vega network can include profiles to help users make decisions about markets.

Profiles are also used to flag oracle performance issues.

## Quick start

1. Copy the [template oracle profile](#link)
2. Use the oracle's public key as the filename
3. Populate the template with the oracle details
4. Optional: Provide [proofs](#proofs) for social media accounts
3. Create a pull request and mark it as ready for review

When merged, the details in the file may be shown alongside other oracle info in apps on the Vega network.

## Submission guidelines

### Public key
The public key defined in the market proposal.

As one key can act as an oracle for multiple markets, the oracle profile may be associated with more than one market.

### Description
The following markdown formatting is accepted:

- Headings
- Links
- Bold
- Underline
- Italic
- Strikethrough

### Proofs
Link to [signed messages](#How_to_sign_a_message) on websites and social media accounts to associate them with the oracle. Each proof is verified by a panel of repo admins.

You are welcome to submit any kind of proof. Common proofs include:

- **Twitter**\
Link to a tweet containing the Twitter username as a signed message
- **Website**\
Link to a .txt file, at the website root, containing the website URL as a signed message
- **Discord**\
Link to a comment in [the Vega Protocol Discord channel](https://discord.com/channels/720571334798737489/) containing the Discord username as a signed message
- **Vega forums**\
Link to a comment in [the Vega forum](https://community.vega.xyz/) containing the forum username as a signed message
- **GitHub**\
Link to a file in a GitHub repo containing  the GitHub username as a signed message
- **Vega or Ethereum key/address**\
???
- **ETH or other decentralised address/domain name**\
???

## How to sign a message

The keypair used to sign the message must match the public key in the oracle profile and market spec.

### VEGA Desktop Wallet
1. Open your Vega desktop wallet
- Click the keypair you want to use
- Enter your message in the text area
- Click ‘sign’
- Click the signed message to copy it to your clipboard

### VEGA CLI Wallet
To generate a signed message using local wallet, run the following command:

#### MacOS & Linux

```
./vegawallet sign --key ReplaceWithTheOraclePublicKey --wallet ReplaceWithTheWalletUsername --message ReplaceWithTheMessage
```

#### Windows

```
vegawallet sign --key ReplaceWithTheOraclePublicKey --wallet ReplaceWithTheWalletUsername --message ReplaceWithTheMessage
```

## Status

Oracles typically have the status `active`.

Other statuses may be labelled with the fol

Apps on the Vega network may choose to expose these statuses to users.

| Flag | Description |
|:--|:--|
| Malicious | This public key has been observed acting in bad faith. |
| Retired | This public key is no longer in use. |
|  |  |
|  |  |