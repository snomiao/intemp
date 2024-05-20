# Inline Templator (intemp)

Fill configurations template with inline ${CLOZE} s.

## Use cases:

### Yaml templator:

Input:

```yaml
# ./config.yaml
Client: GoCQHttp
GoCQHttp:
  type: HTTP
  #$ access: ${ACCESS_TOKEN}
  access_token: "..."
  api_root: http://go-cqhttp:5700/
  api_timeout: 60
  host: 0.0.0.0
  port: 8000
```

Run:

```bash
crossenv ACCESS_TOKEN=icX7z8qE4GA5YRzg intemp config.yaml
```

Output:

```yaml
# ./config.yaml
Client: GoCQHttp
GoCQHttp:
  type: HTTP
  # ${access_token=ACCESS_TOKEN}
  access_token: icX7z8qE4GA5YRzg
  api_root: http://go-cqhttp:5700/
  api_timeout: 60
  host: 0.0.0.0
  port: 8000
```
