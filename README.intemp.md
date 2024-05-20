# Inline Templator (intemp)

Fill configurations template with github-action-style inline Env or File.

## Use cases:

### Yaml templator:

Input Files:

[./config.intemp.yaml]([/config.intemp.yaml)

```yaml
${{ file://./config.intemp.yaml }}
```

[./.env](./.env)

```sh
# .env
${{ file://.env }}
```

Run:

```bash
bunx intemp
```

Output Files:

[./config.yaml](./config.yaml)

```yaml
# config.yaml
${{ file://./config.yaml }}
```

### README templator:

Input Files:

[./README.intemp.md](./README.intemp.md)

```yaml
${{ file://./README.intemp.md }}
```

```sh
${{ file://.env }}
```

Run:

```bash
bunx intemp
```

Output Files:

`./README.md` (Yes, You are reading the output of intemp.)

### MyIP Templator, fetching your IP from web, fill into myip.txt

Input Files:

[./myip.intemp.txt](./myip.intemp.txt)

```yaml
${{ file://./myip.intemp.txt}}
```

Run:

```bash
bunx intemp
```

Output Files:

`./myip.txt`
