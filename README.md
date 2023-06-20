# Vega Oracle Profiles

This is a repository for maintaining data about well known entities to the Vega community.

Oracle profiles are an optional, extra layer of information about oracles on the Vega network, including:

- Oracle name
- Description
- URL
- [Proofs](#proofs), like verified social media accounts

Oracle developers can use profiles to explain their methodology and demonstrate their reputation.

Apps on the Vega network can include profiles to help users make decisions about markets.

Profiles are also used to flag potential issues with oracles or reasons to doubt their legitimacy.

## Data stored here

- [Oracle providers](./oracle-providers/): details about public keys of known oracle providers
- [Template](./oracle-providers/template.toml): template file for new profile submissions

## Disclaimer

This repository is for data regarding oracles used in markets on the Vega trading platform.

Anyone can contribute to it and no representations or warranties of any kind are made by any party about the accuracy of the information contained in it.

## Quick start: creating an oracle profile

1. Copy the [template oracle profile](./oracle-providers/template.toml)
2. Use the oracle's public key as the filename
3. Populate the template with the oracle details
4. Optional: Provide [proofs](#proofs) for social media accounts
3. Open a pull request and mark it as ready for review

The Vega project team will review the contents of the PRs and if able to verify the proofs contained therein will merge it.  This does not constitute an endorsement of the oracle, and does not imply the community should trust it.  All it demonstrates is that the proofs are independently verifiable and this verification could (and should) be repeated by individuals within the community.

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
Link to [signed messages](#how-to-sign-a-message) on websites and social media accounts to associate them with the oracle. Each proof is verified by a panel of repo admins.

Oracle providers are welcome to submit any kind of proof. Common proofs include:

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


## How to sign a message

The keypair used to sign the message must match the public key in the oracle profile and market spec.

### VEGA Desktop Wallet
1. Open your Vega desktop wallet
2. Click the keypair you want to use
3. Enter your message in the text area
4. Click ‘sign’
5. Click the signed message to copy it to your clipboard

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

Apps on the Vega network may choose to expose these statuses to users.

| Flag | Description |
|:--|:--|
| Unknown | This public key's proofs have not been verified yet, or no proofs have been provided yet. |
| Good | This public key's proofs have been verified. |
| Suspicious | This public key is suspected to be acting in bad faith, pending investigation. |
| Malicious | This public key has been observed acting in bad faith. |
| Retired | This public key is no longer in use. |
| Compromised | This public key is no longer in the control of its original owners. |

## Help and issues

If you need help creating an oracle profile, you can find it in [the Vega forum](https://community.vega.xyz/).

You are also welcome to make suggestions or highlight problems by [raising an issue](https://github.com/vegaprotocol/well-known/issues/new).
