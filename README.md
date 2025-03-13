# Inline Templator (intemp)

Fill configurations template with github-action-style inline Env or File.

## Supported Replacement Types

- FILENAME.intemp.EXT file in case filling secrets to template, and wont commit the output file.
  ${{ env.ACCESS_TOKEN }}
<!-- - FILENAME.EXT file in case filling non secrets to template
  ${{ env.ACCESS_TOKEN }} -->

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
