async function getServerStatus(serverId) {
    // Simulate server status data (replace with your actual data fetching method)

    //fetch Server 1
    if(serverId === "mikenug") {
        const status = fetch(`https://mikenug-server-new.onrender.com/`)
        .then((response) => response.text())
        .then(async (status) => {
            if(status === "Servers Up") {
                return "Online";
            }
        }).catch(e => {
            return "Offline"
        })

        return {
            status: await status
        };
    }else if(serverId === "halalas-cloud") {
        const status = fetch(`https://data.halalas-services.xyz/`)
        .then((response) => response.text())
        .then(async (status) => {
            if(status === "Servers Up") {
                return "Online";
            }
        }).catch(e => {
            return "Offline";
        });

        return {
            status: await status
        };
    }
}

async function updateStatus() {
    const server1Data = await getServerStatus('mikenug');
    const server2Data = await getServerStatus('halalas-cloud');

    // Update Server 1
    const server1StatusText = document.getElementById('server1-status-text');
    server1StatusText.textContent = server1Data.status;
    server1StatusText.classList.remove('online', 'offline');
    server1StatusText.classList.add(server1Data.status.toLowerCase());

    // Update Server 2
    const server2StatusText = document.getElementById('server2-status-text');
    server2StatusText.textContent = server2Data.status;
    server2StatusText.classList.remove('online', 'offline');
    server2StatusText.classList.add(server2Data.status.toLowerCase());
}

// Update status every 10 seconds
setInterval(updateStatus, 10000);
updateStatus(); // Initial update when the page loads
