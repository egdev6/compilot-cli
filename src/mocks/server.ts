//-- plop hook for mocks --//
  {
      "pattern": "/mock/dash",
      "method": "GET",
      "delay": 100,
      "handle": async (_req, res) => {
        const data = await import('./data/dash.json');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      }
  }