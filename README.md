<h1>First Setup</h1>
<h2>Initial Steps</h2>
Clone repository
(Could be automated to some degree)
Create .venv
Install dependencies
Install Caddy
<h2>Caddy</h2>
<h3>Caddyfile</h3>
``` http://127.0.0.1:8089 {
        handle /check {
                respond "Caddy is healthy"
        }

        handle {
                reverse_proxy 127.0.0.1:5001
        }

} ```

<h3>Service Specific</h3>
<h4>Cockpit</h4>
Add UrlRoot to config 
``` sudo nano /etc/cockpit/cockpit.conf ```
``` [WebService]
    Origins = http://127.0.0.1:8089
    UrlRoot = /services/cockpit/
    ProtocolHeader = X-Forwarded-Proto ```
Change host and reachability
``` sudo systemctl edit cockpit.socket ```
