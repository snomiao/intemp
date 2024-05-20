# Inline Templator (intemp)

Fill configurations template with github-action-style inline Env or File.

## Use cases:

### Yaml templator:

Input Files:

[./config.intemp.yaml]([/config.intemp.yaml)

```yaml

Client: GoCQHttp
GoCQHttp:
  type: HTTP
  access_token: ${{ env.ACCESS_TOKEN }}
  api_root: http://go-cqhttp:5700/
  api_timeout: 60
  host: 0.0.0.0
  port: 8000
```

[./.env](./.env)

```sh
# .env
ACCESS_TOKEN=icX7z8qE4GA5YRzg
```

Run:

```bash
bunx intemp
```

Output Files:

[./config.yaml](./config.yaml)

```yaml
# config.yaml

Client: GoCQHttp
GoCQHttp:
  type: HTTP
  access_token: icX7z8qE4GA5YRzg
  api_root: http://go-cqhttp:5700/
  api_timeout: 60
  host: 0.0.0.0
  port: 8000
```

### README templator:

Input Files:

[./README.intemp.md](./README.intemp.md)

```yaml
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

```

```sh
ACCESS_TOKEN=icX7z8qE4GA5YRzg
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
${{ https://ifconfig.me/ip }}
```

Run:

```bash
bunx intemp
```

Output Files:

`./myip.txt`
