# Inline Templator (intemp)

Fill configurations template with github-action-style inline Env or File.

## Use cases:

### Yaml templator:

Input Files:

```yaml
# config.intemp.yaml
${{ file://./config.intemp.yaml }}
```

```sh
# .env
${{ file://.env }}
```

Run:

```bash
bunx intemp
```

Output Files:

```yaml
# config.yaml
${{ file://./config.yaml }}
```

### README templator:

Input Files:

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
