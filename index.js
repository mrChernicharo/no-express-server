const http = require('http');
const url = require('url');

// Create an array to store projects and jobs data
let projects = [];
let projectId = 0;
let jobs = [];
let jobId = 0;

// Create the server
const server = http.createServer((req, res) => {
	const { pathname, query } = url.parse(req.url, true);
	console.log('request received', pathname);
	console.log('request method', req.method);

	// Set response headers
	res.setHeader('Content-Type', 'application/json');

	// Projects endpoints
	if (pathname === '/projects') {
		if (req.method === 'GET') {
			res.statusCode = 200;
			return res.end(JSON.stringify({ projects }));
		}
		if (req.method === 'POST') {
			req.on('data', data => {
				let stringifiedData = '';
				for (const chunk of data.toString()) {
					stringifiedData += chunk;
				}

				const project = {
					id: ++projectId,
					...JSON.parse(stringifiedData),
				};
				projects.push(project);

				res.statusCode = 201;
				return res.end(
					JSON.stringify({
						message: `Project id ${project.id} created successfully`,
						project,
					})
				);
			});
		}
	} else if (pathname.startsWith('/projects/')) {
		const projectId = pathname.split('/')[2];
		if (req.method === 'GET') {
			res.statusCode = 200;
			return res.end(JSON.stringify({ projects }));
		} else if (req.method === 'PUT') {
			return (res.statusCode = 200);
		} else if (req.method === 'DELETE') {
			return (res.statusCode = 200);
		}
	}

	// Jobs endpoints
	else if (pathname === '/jobs') {
		if (req.method === 'GET') {
			res.statusCode = 200;
			return res.end(JSON.stringify({ jobs }));
		} else if (req.method === 'POST') {
			req.on('data', data => {
				let stringifiedData = '';
				for (const chunk of data.toString()) {
					stringifiedData += chunk;
				}

				const job = { id: ++jobId, ...JSON.parse(stringifiedData) };
				jobs.push(job);

				res.statusCode = 201;
				return res.end(
					JSON.stringify({
						message: `Job id ${job.id} created successfully`,
						job,
					})
				);
			});
		}
	} else if (pathname.startsWith('/jobs/')) {
		const jobId = pathname.split('/')[2];
		if (req.method === 'GET') {
			res.statusCode = 200;
			return res.end(JSON.stringify({ jobs }));
		} else if (req.method === 'PUT') {
			return (res.statusCode = 200);
		} else if (req.method === 'DELETE') {
			return (res.statusCode = 200);
		}
	}

	// Handle invalid routes
	else {
		res.end(JSON.stringify({ error: 'Not found' }));
	}
});

// Start the server
const port = 3000;
server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
