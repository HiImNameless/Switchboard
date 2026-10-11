# Modular System Hub — Living Design Specification

Status: Working design; decisions are recorded as agreed, proposed, or open.
Created: 2026-10-09
Last updated: 2026-10-09

## 1. Purpose and document practice

This document captures the ongoing planning discussion. It is not an implementation authorization or a claim that integration compatibility has been verified.

Update it when the discussion establishes a meaningful requirement, decision, constraint, or trade-off. Keep agreed decisions distinct from proposals. Record superseded decisions with their reasons rather than silently changing their meaning.

The original uploaded specification is reference material. Files under `sources/` remain read-only. This document is maintained separately.

## 2. System vision

Build a private hub on the home server, Dyson, that provides a common workspace for existing services and future custom systems.

The long-term goal is to let new systems connect through defined interfaces, share explicitly permitted information, and contribute interfaces, notifications, or dashboard content without depending on one another's internal implementation.

Learning to build and understand the system personally is an explicit project goal, alongside its practical utility and value as a foundation for future projects. The owner is willing to invest time learning the recommended languages and tools. Guidance should support the owner's own implementation through explanations, small exercises, feedback, and review rather than replacing that work with complete AI-generated implementations.

The user envisages central data storage, including information retained from previously connected systems. Data ownership, retention, and access rules still need design. Central storage alone does not establish a stable sharing interface.

The initial hub is for the owner only. Other people currently receive access to selected existing services, such as Calibre Web; there are no current plans to give them access to the hub.

## 3. Current environment

The owner uses Tailscale for private remote access and selected-user service access. Supplied `tailscale serve status` output confirms existing reverse-proxy mappings and named Tailscale Services.

| Service | Local upstream shown in supplied output |
| --- | --- |
| Unlabelled Serve mapping | `http://127.0.0.1:8083` |
| AdGuard Home | `http://127.0.0.1:80` |
| Backrest | `http://127.0.0.1:9898` |
| Calibre Web | `http://127.0.0.1:8083` |
| Cockpit | `http://127.0.0.1:9090` |
| Dockge | `http://127.0.0.1:5001` |
| Hermes | `http://127.0.0.1:9119` |
| n8n | `http://127.0.0.1:5678` |
| Netdata | `http://127.0.0.1:19999` |
| Syncthing Dyson | `https+insecure://127.0.0.1:8384` |

These are upstream addresses, not a confirmed inventory of client-facing addresses or ports. The application behind the Hermes entry has not been identified. The owner also has an existing daily newspaper cron job.

## 4. Agreed prototype scope

- Prioritize the dashboard and services workspace before tender processing, AI integration, or a broad module platform.
- Keep hub navigation visible while using a service's WebUI in the main content area.
- Support opening each service in a separate tab as an additional option.
- Use Cockpit, Dockge, and AdGuard Home as the first integrations.
- Use established reverse-proxy software for hub routing; the product choice remains open.
- Expose the dedicated proxy through a private Tailscale Serve endpoint for the hub.
- Preserve existing independent service access while adding the hub route. Compatibility changes must be checked against both access paths.
- Restrict initial hub access to the owner. A dedicated Tailscale group and named hub service are the selected direction for network access control.
- Validate embedding during development. No service's end-to-end compatibility has yet been demonstrated.

## 5. Architecture direction

### Browser-facing request flow

```text
Browser -> Tailscale Serve -> Dedicated reverse proxy
                                 |-> Hub interface and API
                                 |-> Cockpit
                                 |-> Dockge
                                 |-> AdGuard Home
```

The hub interface tells the browser which service view to load. The browser makes service requests through the proxy; the hub backend does not need to relay the full service traffic.

Existing named Tailscale endpoints remain an independent route to their corresponding services.

### Responsibilities

| Component | Responsibility |
| --- | --- |
| Tailscale | Private connectivity and network access rules |
| Tailscale Serve | Expose the named hub endpoint and forward requests to the dedicated proxy |
| Dedicated reverse proxy | Route hub and service traffic; handle integration-specific paths, headers, and live connections |
| Hub interface | Persistent navigation, dashboard, embedded service area, and separate-tab action |
| Hub API | Hub configuration and dashboard data; later, defined interfaces for module integration |
| Hub database | Persist hub-owned records and settings; shared module storage design is a later discussion |
| Existing services | Continue owning their application logic, storage, and service authentication |

### Foundation proposals requiring confirmation

- Include a small database and API in the foundation, initially for service registrations and dashboard settings.
- Keep the hub interface and API in one application, with clearly defined internal responsibilities.
- PostgreSQL is a candidate database; FastAPI was suggested in the original draft. Neither is a finalized technology decision.
- Avoid introducing a general plugin engine, Redis, event streaming, or separate backend services until a concrete requirement justifies them.

## 6. Access and authentication

The planned named hub endpoint would point to the dedicated proxy. A hub-specific Tailscale group would initially contain the owner only. Review existing access rules because grants are additive; a narrow rule does not override a broader allowance.

Access to a proxy endpoint grants a route to what that proxy exposes. It does not automatically preserve the requesting user's permissions on each original service endpoint.

For any future multi-user hub, menu visibility is not sufficient authorization. Protected service routes, APIs, and live connections would need server-side enforcement. The proxy could consult the hub for authorization while handling traffic itself.

Existing service logins remain in use initially. A hub login was discussed as a proposal, but its necessity and implementation have not been finalized. Unified login across services is outside the initial scope.

The proxy should be reachable through the intended private entry point; exact listening addresses, container networking, and other access paths must be defined during deployment planning.

## 7. Embedding strategy and constraints

Apply service-specific integration choices in this order:

1. Use the application's supported embedding configuration.
2. Use a shared browser origin where required and supported.
3. Consider narrowly scoped proxy header adjustments for applications the owner administers, preserving unrelated security protections.
4. Consider a custom hub interface backed by a service API only when embedding is unsuitable and the feature warrants that development.

A shared origin requires matching protocol, hostname, and port. Different paths can share an origin; different subdomains or ports do not. A reverse proxy does not guarantee embedding compatibility.

| Service | Documentation-based assessment; not a tested result |
| --- | --- |
| Cockpit | Documents embedding through a shared origin, commonly provided by a reverse proxy. Check login, URL routing, terminal, and live connections. |
| Dockge | Reverse-proxy use is discussed by the project. Test frame loading, login, stack navigation, terminal, and live logs. |
| AdGuard Home | Documents reverse-proxy configurations. Test embedding, login, query logs, and settings. |
| Syncthing | Documents an option allowing frame loading. Outside the first integration set. |
| n8n | Warns that deployment under a path with a reverse proxy can cause navigation issues. Subdomain routing is recommended in its documentation, but that alone does not establish embedding compatibility. |
| Netdata, Backrest, Calibre Web | Embedding compatibility remains unverified. |
| Hermes | Identify the installed WebUI before evaluating integration. |

No identified service has been established to require a replacement UI. Shared-origin applications have a closer browser trust relationship; assess that when choosing routes and embedding policies.

## 8. Prototype requirements and acceptance criteria

### Initial services workspace

- Display persistent hub navigation while operating each initial service.
- Allow login and ordinary internal navigation within the embedded interface.
- Preserve live features relevant to each service, including Cockpit's terminal and Dockge's logs.
- Offer a separate-tab action with a working service address.
- Show a useful unavailable/error state without making the whole hub unusable.
- Verify independent service access after integration configuration changes.
- Confirm that intended Tailscale access rules permit the owner and exclude other existing users from the hub endpoint.

### Dashboard direction

The owner wants system information, system notifications, and potentially content from the existing daily newspaper job. Exact metrics, layout, notification behaviour, and first-version content remain open.

Service availability is a proposed first dashboard feature. A successful HTTP response alone must not be described as proof that the complete application is healthy.

## 9. MVP roadmap

| Milestone | Outcome | Evidence needed |
| --- | --- | --- |
| 1. Integration foundation | Private hub endpoint, dedicated proxy, basic hub shell, and initial configuration storage/API as agreed | Owner can reach the hub; routing and access boundaries are verified |
| 2. Services workspace | Cockpit, Dockge, and AdGuard Home usable inside persistent hub navigation | Login, navigation, live features, separate-tab opening, and independent access tested |
| 3. Useful dashboard | Agreed system information and service status with clear failure states | Displayed information matches its source and handles missing data |
| 4. First extension | Proposed integration of the existing newspaper job | One existing producer contributes content through a documented interface |

No timeline is committed. Milestones 3 and 4 require additional requirements discussion. Integration difficulties may change the ordering within milestone 2.

## 10. Future module direction

The tender module is a later use case. Listings may include reference numbers, closing dates, descriptions, and related PDFs. Distinguish original document files from extracted text and retain source links for verification.

The owner wants an AI consumer such as Hermes to query authorized information for answers and analysis. Initial AI access is read-only; write actions are not part of the initial AI scope.

Controlled operations such as search listings, retrieve details, and read document text were discussed as an interface direction. Enforcement belongs in the system rather than relying solely on model instructions.

Local inference is not mandatory. Local and cloud options may be compared later using representative tasks, cost, and performance. Company funding may be available for work-related use.

For future module specifications, capture purpose, data ownership, exposed operations, permissions, dependencies, failure handling, lifecycle/retention, interface contribution, and acceptance criteria. Do not assume existing third-party services must move their databases into the hub.

## 11. Decision log

| ID | Date | Status | Decision or proposal | Reason |
| --- | --- | --- | --- | --- |
| D-001 | 2026-10-09 | Agreed | Prioritize a modest dashboard/services prototype | Establish a useful foundation before expanding ambition |
| D-002 | 2026-10-09 | Agreed | Embedded service operation is essential; separate-tab opening is optional | The intended experience is a unified workspace |
| D-003 | 2026-10-09 | Agreed | First services: Cockpit, Dockge, AdGuard Home | Owner-selected priorities |
| D-004 | 2026-10-09 | Agreed | Initial hub is owner-only | No current multi-user hub requirement |
| D-005 | 2026-10-09 | Agreed direction | Dedicated proxy exposed through a named Tailscale hub endpoint | Central control of integration-specific routing while retaining private access |
| D-006 | 2026-10-09 | Agreed direction | Keep existing service endpoints alongside hub access | Preserve independent access and existing selected-user service arrangements |
| D-007 | 2026-10-09 | Agreed direction | Hub-specific Tailscale access group | Restrict the new endpoint independently of existing services |
| D-008 | 2026-10-09 | Proposed | Small foundation database and API | Persist hub settings and establish controlled interfaces around real needs |
| D-009 | 2026-10-09 | Open | Proxy, backend, frontend, and database products | Choose after agreeing operational constraints |
| D-010 | 2026-10-09 | Agreed | Test embedding during development | Compatibility remains an explicit validation task |
| D-011 | 2026-10-09 | Agreed | Initial AI integration provides answers only | Begin with read-only access |
| D-012 | 2026-10-09 | Agreed | AI hosting remains open to local and cloud options | Compare cost and performance for actual tasks later |
| D-013 | 2026-10-09 | Agreed | Maintain this living design specification throughout discussion | Preserve planning and distinguish decisions from assumptions |
| D-014 | 2026-10-09 | Proposed | Python/FastAPI, TypeScript/React/Vite, PostgreSQL, Caddy, and Docker Compose | Concrete technology recommendation in section 14; awaiting discussion |

## 12. Open planning questions

- What initial dashboard information is useful enough to include?
- Which backend, frontend, database, and proxy choices suit the owner's experience and Dyson's environment?
- Should the personal prototype have an additional hub login, and what does it protect beyond Tailscale access?
- What routes and service configurations support embedding without breaking independent access?
- How should switching views handle service state, ongoing terminals, and resource use?
- What backup and restore process covers the hub's configuration and database?
- What minimal interface should a first custom extension implement?
- How will future modules own data, grant access, and preserve interpretable records after disconnection?

## 13. References

- Original uploaded “Design Specification: Modular System and Application Hub Web Application” and the ongoing planning conversation.
- [Tailscale Services](https://tailscale.com/docs/features/tailscale-services)
- [Tailscale grants syntax](https://tailscale.com/docs/reference/syntax/grants)
- [Tailscale Serve](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Cockpit embedding and development guide](https://docs.cockpit-project.org/cockpit-guide/368/guide/development.html)
- [Cockpit configuration](https://docs.cockpit-project.org/cockpit-guide/main/man/cockpit.conf.5.html)
- [Dockge reverse-proxy discussion](https://github.com/louislam/dockge/discussions/222)
- [AdGuard Home FAQ](https://adguard-dns.io/kb/adguard-home/faq/)
- [Syncthing configuration](https://docs.syncthing.net/users/config.html)
- [n8n deployment settings](https://docs.n8n.io/hosting/configuration/environment-variables/deployment/)
- [Browser embedding policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)

Documentation was consulted during planning; installed versions and behaviour remain to be checked.

## 14. Proposed technology stack

Status: Recommendation for discussion, not yet an agreed product selection. The owner recalls Python/FastAPI and TypeScript being selected in the earlier Gemini discussion; the current plan considers those preferences.

### Owner experience and learning constraints

The owner recently began learning Python and JavaScript, has prior experience across other languages, and reports picking up syntax and concepts quickly. Current practice includes the CodeCrafters Python shell project (approximately the first three stages completed) and LeetCode challenges. The owner has not used React.

Treat framework experience separately from language syntax familiarity. Preserve the collaborative mentorship approach: explain architectural choices and framework concepts as they become relevant, and develop in small, understandable increments. Python/FastAPI and TypeScript/React remain recommendations rather than confirmed choices.

The proposed learning sequence is a small Python API and its request/response flow, then a React shell with a few focused components, then API-driven service registrations and persistence. This is a teaching sequence within the agreed milestones, not an implementation plan or permission to start development. Introduce basic TypeScript types alongside the first components; avoid advanced type machinery and extra state-management libraries unless requirements justify them. LeetCode and shell exercises develop useful foundations, while this project will additionally teach HTTP, browser state, database changes, authentication boundaries, and deployment.

### Proposed first development milestone: local hub shell

The existing planning is sufficient to define a first narrow prototype; dashboard details, long-term module contracts, and third-party compatibility remain open. Begin in a separate application repository, leaving the synced project references untouched. Prefer development on the owner's main computer and subsequent deployment validation on Dyson.

First outcome: a browser interface retrieves a small service list from the Python API, displays persistent navigation, and changes the main view when a service is selected.

- Define a minimal service record with stable identifier, display name, and existing standalone URL. Treat embedded routes as separate configuration when the proxy integration is introduced.
- Create a FastAPI application with a health endpoint and a read-only service-list endpoint. Initially use three temporary in-memory records for Cockpit, Dockge, and AdGuard Home; this is scaffolding, not the final persistence design.
- Create a React/TypeScript interface that fetches those records, displays a sidebar, and shows the selected service's name in the main area. Add loading and request-failure states.
- Validate that the UI uses API data, switching selection works, and API failure produces a clear message.
- Introduce PostgreSQL and schema migrations after that request/response flow is understood; replace the temporary records with persisted registrations.
- Introduce Caddy and the private hub endpoint, then verify the three actual WebUI integrations individually.

The local hub shell does not claim to satisfy the essential embedded-service requirement. That remains an acceptance gate for the usable prototype. Do not modify existing Dyson service routes merely to complete the local shell.

| Area | Recommended choice | Role and rationale |
| --- | --- | --- |
| Backend | Python with FastAPI, Pydantic, and Uvicorn | Hub API and integration logic; validated request/response models, generated API documentation, and Python continuity with future automation |
| Frontend | TypeScript with React and Vite | Persistent navigation, service views, dashboard components, and client-side interaction; compile the frontend to static assets for deployment |
| Styling | Plain CSS initially | Keep the first interface's dependency and learning requirements small; reassess a UI component library when visual requirements are clearer |
| Database | PostgreSQL | Persistent hub records initially, with a path to later module data; carries an explicit maintenance and backup responsibility |
| Database access | SQLAlchemy and a PostgreSQL driver | Backend-owned database access; frontend and external consumers use defined APIs |
| Database changes | Alembic | Versioned schema migrations so updates can be reviewed and applied predictably |
| Dedicated reverse proxy | Caddy | Central routes and integration-specific configuration; built-in WebSocket proxying and forward-auth support if hub authorization is added |
| Private exposure | Existing Tailscale Serve and named Services | Expose the hub endpoint privately and retain existing named endpoints |
| Deployment | Docker Compose, operated through existing Dockge if desired | Define proxy, backend, database, networks, and persistent volumes together |

### Why Caddy is the proposed proxy

Caddy is preferred here for readable checked-in configuration and the required proxy capabilities. Nginx is a viable alternative with more explicit configuration for some features. Traefik would become more attractive if automatic discovery of many container services became a central requirement; it is not required for the first prototype. This comparison is a fit judgment rather than a claim that one product is universally better.

Tailscale Serve should initially own the client-facing HTTPS endpoint. Caddy would handle internal routing; do not introduce a separate public domain or certificate workflow without a requirement. The HTTP connection between Serve and Caddy must be deliberately kept local/private. Caddy configuration must be tested against native and containerized service addresses; `127.0.0.1` inside a container refers to that container, not automatically to Dyson.

### Supporting development and operations tools

- Use Git to version application code, configuration, and documentation.
- Use uv for Python dependencies and environments; use npm for frontend dependencies. Lock dependency versions and select supported stable runtime versions at implementation planning time.
- Use Ruff for Python formatting and linting, pytest for meaningful backend/API tests, and Playwright for hub browser flows. Embedded services and cross-origin login/live features still require appropriate service-specific and manual verification.
- Begin with ordinary application and proxy logs, availability checks, and existing server monitoring. Select dashboard metric sources separately.
- Reuse Backrest where suitable for backup storage, with a defined PostgreSQL logical dump and a restore test; copying live database files is not assumed to be a complete backup strategy.
- Keep existing service authentication initially. A hub session implementation remains an open decision; no separate identity-provider service is selected.

### Runtime shape

The frontend is built into static files served by Caddy, alongside routes to the FastAPI backend and approved service upstreams. The initial new runtime components are Caddy, FastAPI/Uvicorn, and PostgreSQL. Node.js is needed for frontend development/builds, not a separate production frontend server under this proposal. Tailscale Serve remains on Dyson as currently configured.

### Deferred tools

Redis, a task queue, a dedicated scheduler, object storage, vector search, Kubernetes, and additional monitoring or identity-provider stacks are not selected for the prototype. Add them only when a documented feature requires them. Heavy scraping or AI processing should receive a separate worker design when those modules enter scope.

### Technology references

- [FastAPI features](https://fastapi.tiangolo.com/features/)
- [React learning guide](https://react.dev/learn)
- [Vite guide](https://vite.dev/guide/)
- [Caddy reverse proxy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)
- [Caddy forward authentication](https://caddyserver.com/docs/caddyfile/directives/forward_auth)
- [Docker Compose](https://docs.docker.com/compose/)
- [SQLAlchemy documentation](https://docs.sqlalchemy.org/)
- [Alembic documentation](https://alembic.sqlalchemy.org/en/latest/)
- [uv documentation](https://docs.astral.sh/uv/)
- [Ruff documentation](https://docs.astral.sh/ruff/)
- [pytest documentation](https://docs.pytest.org/en/stable/)
- [Playwright introduction](https://playwright.dev/docs/intro)
- [PostgreSQL logical backups](https://www.postgresql.org/docs/current/backup-dump.html)

## Aditional Ideas (Personal Ideas)
- Hermes and other services that function through multiple instances like syncthing, could have multiple tabs or a way to switch between installs. For example, for hermes there would be one tab for the server side hermes install, desktop hermes and laptop hermes which will all connect to and display the Hermes Dashboard that is hosted on each of the devices. It could also show when a service is unreachable and could also allow for automatic setup/linking or starting the services directly from the interface if the device is reachable from any device with permissions.
- 
