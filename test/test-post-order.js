var expect = require('unexpected');
var getTreeModulesPostOrder = require('../lib/compile').getTreeModulesReversePreOrder;

suite('Test post order traversal', function() {
  test('should return single module that has no incoming relation', function() {
    var tree = {
      'a': {
        name: 'a',
        deps: [],
        depMap: {}
      }
    };

    return expect(getTreeModulesPostOrder(tree).modules, 'to satisfy', ['a']);
  });

  test('should return modules that has no incoming relations', function() {
    var tree = {
      'a': {
        name: 'a',
        deps: [],
        depMap: {}
      },
      'b': {
        name: 'b',
        deps: [],
        depMap: {}
      }
    };

    return expect(getTreeModulesPostOrder(tree).modules, 'to satisfy', ['b', 'a']);
  });

  test('should resolve module names based on depMap', function() {
    var tree = {
      'a': {
        name: 'a',
        deps: ['foo'],
        depMap: {
          'foo': 'b'
        }
      },
      'b': {
        name: 'b',
        deps: [],
        depMap: {}
      }
    };

    return expect(getTreeModulesPostOrder(tree).modules, 'to satisfy', ['b', 'a']);
  });

  test('should order modules with dependencies first', function() {
    var tree = {
      'a': {
        name: 'a',
        deps: ['b', 'd'],
        depMap: {
          'b': 'b',
          'd': 'd'
        }
      },
      'b': {
        name: 'b',
        deps: ['c'],
        depMap: {
          'c': 'c'
        }
      },
      'c': {
        name: 'c',
        deps: [],
        depMap: {}
      },
      'd': {
        name: 'd',
        deps: [],
        depMap: {}
      }
    };

    return expect(getTreeModulesPostOrder(tree).modules, 'to satisfy', ['d', 'c', 'b', 'a']);
  });

  test('should order graph entries alphabetically', function() {
    var tree = {
      'a': {
        name: 'a',
        deps: ['b'],
        depMap: {
          'b': 'b'
        }
      },
      'b': {
        name: 'b',
        deps: ['c'],
        depMap: {
          'c': 'c'
        }
      },
      'c': {
        name: 'c',
        deps: [],
        depMap: {}
      },
      'd': {
        name: 'd',
        deps: [],
        depMap: {}
      }
    };

    return expect(getTreeModulesPostOrder(tree).modules, 'to satisfy', ['d', 'c', 'b', 'a']);
  });

  test('should override alphabetical graph entry order with entryPoints array', function() {
    var tree = {
      'a': {
        name: 'a',
        deps: ['b'],
        depMap: {
          'b': 'b'
        }
      },
      'b': {
        name: 'b',
        deps: ['c'],
        depMap: {
          'c': 'c'
        }
      },
      'c': {
        name: 'c',
        deps: [],
        depMap: {}
      },
      'd': {
        name: 'd',
        deps: [],
        depMap: {}
      }
    };

    return expect(getTreeModulesPostOrder(tree, ['d', 'a']).modules, 'to satisfy', ['d', 'c', 'b', 'a']);
  });

  test('should include entry points not present in given entryPoints order, in alphabetical order', function() {
    var tree = {
      'a': {
        name: 'a',
        deps: ['b'],
        depMap: {
          'b': 'b'
        }
      },
      'b': {
        name: 'b',
        deps: ['c'],
        depMap: {
          'c': 'c'
        }
      },
      'c': {
        name: 'c',
        deps: [],
        depMap: {}
      },
      'd': {
        name: 'd',
        deps: [],
        depMap: {}
      },
      'e': {
        name: 'e',
        deps: [],
        depMap: {}
      }
    };

    return expect(getTreeModulesPostOrder(tree, ['d']).modules, 'to satisfy', ['e', 'd', 'c', 'b', 'a']);
  });
});
