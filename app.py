from flask import Flask, request, make_response, render_template
from flask.ext.cors import CORS
import json
import requests
import re
import os
import operator
import tweet-your-rep

app = Flask(__name__)
cors = CORS(app)

sentry = None
try:
    from raven.contrib.flask import Sentry
    app.config['SENTRY_DSN'] = os.environ['SENTRY_DSN']
    sentry = Sentry(app)
except ImportError:
    pass
except KeyError:
    pass

# ROUTES
@app.route('/api/')
def api():
    input_addr = request.args.get('address')

    # load in CSV to memory
    # geocode address
    # look up the lat/long to get reps https://sunlightlabs.github.io/openstates-api/legislators.html#methods/geo-lookup
    # match open states ID to our local list
    # return legislator info

    parse_resp = {'input-address': input_addr}
    parse_result = tweet-your-rep.parse(input_addr)

    result = []
    for t in parse_result:
      result.append( {'value': t[0], 'tag': t[1]} )

    parse_resp['result'] = result

    if sentry:
        sentry.captureMessage("%s\n%s" % (input_addr, json.dumps(parse_resp, indent=4)))

    resp = make_response(json.dumps(parse_resp))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/')
def index():
    return render_app_template('index.html')

# UTILITY
def render_app_template(template, **kwargs):
    '''Add some goodies to all templates.'''

    if 'config' not in kwargs:
        kwargs['config'] = app.config
    return render_template(template, **kwargs)

# INIT
if __name__ == "__main__":
    app.run(debug=True, port=9999)
