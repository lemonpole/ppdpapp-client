var express = require('express'),
	app		= express();

app.use(express.static('./'));
app.listen(80, function(err) {
	if (err) console.error('Could not start server', err);
	else console.log('Server started on port 80');
});
