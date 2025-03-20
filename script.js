async function getServerStatus(serverId) {
    // Simulate server status data (replace with your actual data fetching method)

    //fetch Server 1
    if (serverId === "mikenug") {
        const status = fetch(`https://mikenug-server-new.onrender.com/`)
            .then((response) => response.text())
            .then(async (status) => {
                if (status === "Servers Up") {
                    return "Online";
                }
            }).catch(e => {
                return "Offline"
            })

        return {
            status: await status
        };
    } else if (serverId === "halalas-cloud") {
        const status = fetch(`https://data.halalas-services.xyz/`)
            .then((response) => response.text())
            .then(async (status) => {
                if (status === "Servers Up") {
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
    const server1StatusText = document.getElementById('server1-status-text');
    const server2StatusText = document.getElementById('server2-status-text');
    server1StatusText.classList.remove('online', 'offline');
    server2StatusText.classList.remove('online', 'offline');
    server1StatusText.textContent = "Loading...";
    server2StatusText.textContent = "Loading...";
    // const server1Data = await getServerStatus('mikenug');
    // const server2Data = await getServerStatus('halalas-cloud');
    changeStatus();
}

async function changeStatus() {
    const server1StatusText = document.getElementById('server1-status-text');
    const server2StatusText = document.getElementById('server2-status-text');

    const server1Data = await getServerStatus('mikenug');
    const server2Data = await getServerStatus('halalas-cloud');

    setTimeout(() => {
    // Update Server 1
    server1StatusText.textContent = server1Data.status;
    server1StatusText.classList.remove('online', 'offline');
    server1StatusText.classList.add(server1Data.status.toLowerCase());

    // Update Server 2
    server2StatusText.textContent = server2Data.status;
    server2StatusText.classList.remove('online', 'offline');
    server2StatusText.classList.add(server2Data.status.toLowerCase());
    }, 250)
}

// Update status every 10 seconds
setInterval(updateStatus, 10000);
updateStatus(); // Initial update when the page loads

//Theme change

document.getElementById("theme-button").addEventListener('click', () => {
    themeChange();
}, false);

function themeChange() {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    document.getElementById("sunmoon").classList.toggle('dark');
    document.querySelector("body").classList.toggle("dark");
    document.querySelectorAll(".server-status h2").forEach(e => {
        e.classList.toggle("dark");
    })
    document.querySelectorAll(".server-status p").forEach(e => {
        e.classList.toggle("dark");
    })
    document.querySelector("h1").classList.toggle("dark")
    document.querySelectorAll(".server-status").forEach(e => {
        e.classList.toggle("dark")
    });
    let theme = document.querySelector("h1").classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme-preference", theme)

    const themeColors = {
        default: "#f5f5f5",
        dark: "#1f1e1e"
    }
    const color = document.querySelector("body").classList.contains("dark") ? themeColors.dark : themeColors.default;
    metaThemeColor.setAttribute('content', color);
}

window.onload = themeLoad
function themeLoad() {
    if (localStorage.getItem("theme-preference") === "dark") {
        document.getElementById("sunmoon").classList.add('notransition');
        document.querySelector("body").classList.add('notransition');
        document.querySelectorAll(".server-status h2").forEach(e => {
            e.classList.add('notransition');
        })
        document.querySelectorAll(".server-status p").forEach(e => {
            e.classList.add('notransition');
        })
        document.querySelector("h1").classList.add('notransition');
        document.querySelectorAll(".server-status").forEach(e => {
            e.classList.add('notransition');
        });
        themeChange();
        setTimeout(() => {
            document.getElementById("sunmoon").classList.remove('notransition');
            document.querySelector("body").classList.remove('notransition');
            document.querySelectorAll(".server-status h2").forEach(e => {
                e.classList.remove('notransition');
            })
            document.querySelectorAll(".server-status p").forEach(e => {
                e.classList.remove('notransition');
            })
            document.querySelector("h1").classList.remove('notransition');
            document.querySelectorAll(".server-status").forEach(e => {
                e.classList.remove('notransition');
            });
        }, 500)
    };
}