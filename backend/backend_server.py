#!/usr/bin/env python3

import sys

def main(host='127.0.0.1', port=None):
    try:
        run(host, port)
    except ImportError as e:
        print('ERROR:', e, file=sys.stderr)
        if sys.version_info < (3,6):
            print('python needs to be 3.6')
        else:
            print('A module required is missing.', file=sys.stderr)
        sys.exit(1)

def run(host, port):
    from app import app
    import api.auth
    import api.recipe
    import api.ingredients
    import api.request
    import api.recommend
    app.run(debug=True, host=host, port=port)

def usage():
    print('Usage: {} [-g]'.format(sys.argv[0]))

if __name__ == "__main__":
    if len(sys.argv) == 1:
        main()
    else:
        usage()