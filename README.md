# Inline Templator (intemp)

Fill configurations template with github-action-style inline ${{ env.CLOZE }} s.

## Use cases:

### Yaml templator:

Input Files:

```yaml
# ./config.intemp.yaml
Client: GoCQHttp
GoCQHttp:
  type: HTTP
  access_token: ${{ env.ACCESS_TOKEN }}
  api_root: http://go-cqhttp:5700/
  api_timeout: 60
  host: 0.0.0.0
  port: 8000
```

```sh
# ./.env
ACCESS_TOKEN=icX7z8qE4GA5YRzg
```

Run:

```bash 
bunx intemp
```

Output Files:

```yaml
# ./config.yaml
Client: GoCQHttp
GoCQHttp:
  type: HTTP
  access_token: icX7z8qE4GA5YRzg
  api_root: http://go-cqhttp:5700/
  api_timeout: 60
  host: 0.0.0.0
  port: 8000
```
