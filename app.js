const apiUrl = 'https://your-api-url.amazonaws.com'; // Replace this with your real API Gateway base URL

document.getElementById('postJobForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const job = {
        title: document.getElementById('title').value,
        company: document.getElementById('company').value,
        description: document.getElementById('description').value,
        email: document.getElementById('email').value,
    };

    try {
        const response = await fetch(`${apiUrl}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(job)
        });
        if (response.ok) {
            alert('Job posted!');
            document.getElementById('postJobForm').reset();
            loadJobs(); // refresh list
        } else {
            alert('Error posting job.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

async function loadJobs() {
    try {
        const res = await fetch(`${apiUrl}/jobs`);
        const jobs = await res.json();

        const jobList = document.getElementById('jobs');
        jobList.innerHTML = '';
        jobs.forEach(job => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${job.title}</strong> at ${job.company}<br>${job.description}`;
            jobList.appendChild(li);
        });
    } catch (err) {
        console.error('Failed to load jobs:', err);
    }
}

// Load jobs on page load
loadJobs();
