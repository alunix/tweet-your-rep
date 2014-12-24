# Tweet Your Rep
If you live in IL, enter your address and find your State representatives and tweet at them.

```bash
git clone git@github.com:open-city/tweet-your-rep.git
pip install -r requirements.txt
python app.py
```

Then navigate to `http://localhost:9999/api/?address=[your address here]`

Example:

http://localhost:9999/api/?address=123%20Main%20St.%20Suite%20100%20Chicago,%20IL

Result:
```json
{

    "result": [
        {
            "tag": "",
            "value": ""
        }
    ],
    "input-address": "123 Main St. Suite 100 Chicago, IL"
}
```
