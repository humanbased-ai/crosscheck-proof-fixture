# Crosscheck Proof Fixture

This repository is a public demo fixture for Crosscheck.

It contains a deliberately small TypeScript service used to prove the Crosscheck loop:

```text
agent PR opened -> Crosscheck BLOCK finding -> fix commit -> recheck APPROVE
```

The fixture PR should add account transaction pagination while accidentally dropping authenticated-user scoping. That creates a realistic tenant-isolation regression for Crosscheck to catch.

## Commands

```bash
npm install
npm test
npm run typecheck
```
