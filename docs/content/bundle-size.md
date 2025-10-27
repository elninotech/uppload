# Bundle size

## Compared to v1

_This section is currently in development._

| Bundle type     | Uppload v1 | Uppload v2   |
| --------------- | ---------- | ------------ |
| Lean build      | 39.8 kB    | some         |
| True build      | 59.1 kB    | some plugins |
| Full build      | 134 kB     | 137 kB       |
| True full build | 154 kB     | 137 kB       |

- In Uppload v1, Lean bundle includes no polyfills; in Uppload v2, it includes no plugins
- Uppload v1 included lazy-loaded components, True builds includes them too
- In Uppload v2, True build includes 6 services and 5 effects, the recommended
- True full builds include all polyfills and plugins
- Uppload v1 included CSS styles while v2 requires loading them separately
