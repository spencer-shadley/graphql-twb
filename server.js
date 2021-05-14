const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const twb = require('./twb');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLGraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const app = express();

/* const datasourcesType = new GraphQLObjectType({
    name: "datasources",
    description: 'datasources',
    fields: () => ({
        datasource: { type: datasourceType }
    })
});

const datasourceType = new GraphQLObjectType({
    name: "datasource",
    description: 'datasource',
    fields: () => ({
        connection: ({type: rootConnectionType})
    })
});

const rootConnectionType = new GraphQLObjectType({
    name: "rootConnectionType",
    description: 'rootConnectionType',
    fields: () => ({
        namedConnections: ({type: namedConnectionsType, resolve: (parent) => ({
          parent["named-connections"]
        }))
    })
});

const namedConnectionsType = new GraphQLObjectType({
    name: "named-connections",
    description: 'named',
    fields: () => ({
        "named-connection": ({
            type: namedConnectionType
        })
    })
});

const namedConnectionType = new GraphQLObjectType({
    name: "named-connection",
    description: 'named',
    fields: () => ({
        connection: {type: ConnectionType },
        _caption: {type: GraphQLGraphQLString, },
        _name: {type: GraphQLGraphQLString,}
    })
});


const ConnectionType = new GraphQLObjectType({
    name: 'connection',
    description: 'connection',
    fields: () => ({
        "_class": {type: GraphQLGraphQLString,},
        "_cleaning": {type: GraphQLGraphQLString,},
        "_compat": {type: GraphQLGraphQLString,},
        "_dataRefreshTime": {type: GraphQLGraphQLString,},
        "_filename": {type: GraphQLGraphQLString,},
        "_googleSheetId": {type: GraphQLGraphQLString,},
        "_interpretationMode": {type: GraphQLGraphQLString,},
        "_mimeType": {type: GraphQLGraphQLString,},
        "_server": {type: GraphQLGraphQLString,},
        "_server-oauth": {type: GraphQLGraphQLString,},
        "_username": {type: GraphQLGraphQLString,},
        "_validate": {type: GraphQLGraphQLString,},
    })
})

const PreferenceType = new GraphQLObjectType({
    name: 'preference',
    description: 'save preferences',
    fields: () => ({
        _name: { type: GraphQLGraphQLString, },
        _value: { type: GraphQLGraphQLString, }
    })
})

const PreferencesType = new GraphQLObjectType({
    name: 'preferences',
    description: 'save preferences',
    fields: () => ({
        preference: { type: GraphQLList(PreferenceType) }
    })
})

const WorkbookType = new GraphQLObjectType({
    name: 'workbook',
    description: 'a workbook',
    fields: () => ({
        preferences: { type: PreferencesType},
        datasources: { type: datasourcesType }
    })
})

const TwbType = new GraphQLObjectType({
    name: 'twb',
    description: 'the entire workbook',
    fields: () => ({
        workbook: { type: WorkbookType }
    })
}); */

const Thumbnail = new GraphQLObjectType({
   name: 'Thumbnail',
   fields: () => ({
    _height: {type: GraphQLString},
    _name: {type: GraphQLString},
    _width: {type: GraphQLString},
    })});
  
  const Thumbnails = new GraphQLObjectType({
     name: 'Thumbnails',
     fields: () => ({
      thumbnail: {type: GraphQLList(Thumbnail)}})});
  
  const Simpleid = new GraphQLObjectType({
     name: 'Simpleid',
     fields: () => ({
      _uuid: {type: GraphQLString, }})});
  
  const Card = new GraphQLObjectType({
     name: 'Card',
     fields: () => ({
      _type: {type: GraphQLString, }})});
  
  const Strip = new GraphQLObjectType({
     name: 'Strip',
     fields: () => ({
      _size: {type: GraphQLString, card: GraphQLList(Card) }})});
  
  const Edge = new GraphQLObjectType({
     name: 'Edge',
     fields: () => ({
      _name: {type: GraphQLString}, strip: {type: GraphQLList(Strip) }})});
  
  const Cards = new GraphQLObjectType({
     name: 'Cards',
     fields: () => ({
      edge: {type: GraphQLList(Edge) }})});
  
  const Window = new GraphQLObjectType({
     name: 'Window',
     fields: () => ({
      _class: {type: GraphQLString},
    _name: {type: GraphQLString},
    simpleid: {type: Simpleid},
    cards: {type: Cards} })});
  
  const Windows = new GraphQLObjectType({
     name: 'Windows',
     fields: () => ({
      _saveddpiscalefactor: {type: GraphQLString},
    _sourceheight: {type: GraphQLString},
    window: {type: GraphQLList(Window) }})});
  
  const Format = new GraphQLObjectType({
     name: 'Format',
     fields: () => ({
      _attr: {
         type: GraphQLString,
         _value: {
            type: GraphQLString
         }
      }})});
  
  const Zonestyle = new GraphQLObjectType({
     name: 'Zonestyle',
     fields: () => ({
      format: {type: GraphQLList(Format)} })});
  
  const Zone = new GraphQLObjectType({
     name: 'Zone',
     fields: () => ({
      _fixedsize: {type: GraphQLString},
    _h: {type: GraphQLString},
    _id: {type: GraphQLString},
    _isfixed: {type: GraphQLString},
    _name: {type: GraphQLString},
    _w: {type: GraphQLString},
    _x: {type: GraphQLString},
    _y: {type: GraphQLString},
    zonestyle: {type: Zonestyle} })});
  
  const Zones = new GraphQLObjectType({
     name: 'Zones',
     fields: () => ({
      zone: {type: GraphQLList(Zone)} })});
  
  const Devicelayout = new GraphQLObjectType({
     name: 'Devicelayout',
     fields: () => ({
      _autogenerated: {type: GraphQLString},
    _name: {type: GraphQLString},
    zones: {type: Zones},
    size: {type: Size} })});
  
  const Devicelayouts = new GraphQLObjectType({
     name: 'Devicelayouts',
     fields: () => ({
      devicelayout: {type: Devicelayout} })});
  
  const Size = new GraphQLObjectType({
     name: 'Size',
     fields: () => ({
      _maxheight: {type: GraphQLString},
    _maxwidth: {type: GraphQLString},
    _minheight: {type: GraphQLString},
    _minwidth: {type: GraphQLString, }})});
  
  const Dashboard = new GraphQLObjectType({
     name: 'Dashboard',
     fields: () => ({
      style: {type: GraphQLString},
    _name: {type: GraphQLString},
    simpleid: {type: Simpleid},
    devicelayouts: {type: Devicelayouts},
    zones: {type: Zones},
    size: {type: Size} })});
  
  const Dashboards = new GraphQLObjectType({
     name: 'Dashboards',
     fields: () => ({
      dashboards: {type: GraphQLList(Dashboard) }})});
  
  const Mark = new GraphQLObjectType({
     name: 'Mark',
     fields: () => ({
      _class: {type: GraphQLString, }})});
  
  const Breakdown = new GraphQLObjectType({
     name: 'Breakdown',
     fields: () => ({
      _value: {type: GraphQLString, }})});
  
  const Pane = new GraphQLObjectType({
     name: 'Pane',
     fields: () => ({
      _selectionrelaxationoption: {type: GraphQLString},
    mark: {type: Mark},
    view: {type: View} })});
  
  const Panes = new GraphQLObjectType({
     name: 'Panes',
     fields: () => ({
      pane: {type: Pane} })});
  
  const Aggregation = new GraphQLObjectType({
     name: 'Aggregation',
     fields: () => ({
      _value: {type: GraphQLString, }})});
  
  const Columninstance = new GraphQLObjectType({
     name: 'Columninstance',
     fields: () => ({
      _column: {type: GraphQLString},
    _derivation: {type: GraphQLString},
    _name: {type: GraphQLString},
    _pivot: {type: GraphQLString},
    _type: {type: GraphQLString, }})});
  
  const Column = new GraphQLObjectType({
     name: 'Column',
     fields: () => ({
      _datatype: {type: GraphQLString},
    _name: {type: GraphQLString},
    _role: {type: GraphQLString},
    _type: {type: GraphQLString, }})});
  
  const Datasourcedependencies = new GraphQLObjectType({
     name: 'Datasourcedependencies',
     fields: () => ({
      _datasource: {type: GraphQLString},
    columninstance: {type: GraphQLList(Columninstance)},
    column: {type: GraphQLList(Column) }})});
  
  const Datasources = new GraphQLObjectType({
     name: 'Datasources',
     fields: () => ({
      datasource: {type: Datasource} })});
  
  const View = new GraphQLObjectType({
     name: 'View',
     fields: () => ({
      aggregation: {type: Aggregation},
    datasourcedependencies: {type: Datasourcedependencies},
    datasources: {type: Datasources} })});
  
  const Table = new GraphQLObjectType({
     name: 'Table',
     fields: () => ({
      style: {type: GraphQLString},
    rows: {type: GraphQLString},
    cols: {type: GraphQLString},
    panes: {type: Panes},
    view: {type: View} })});
  
  const Worksheet = new GraphQLObjectType({
     name: 'Worksheet',
     fields: () => ({
      _name: {type: GraphQLString},
      simpleid: {type: Simpleid},
      table: {type: Table} })});
  
  const Worksheets = new GraphQLObjectType({
     name: 'Worksheets',
     fields: () => ({
      worksheet: {type: GraphQLList(Worksheet)}}) });

  const Columns = new GraphQLObjectType({
     name: 'Columns',
     fields: () => ({
      _gridOrigin: {type: GraphQLString},
    _header: {type: GraphQLString},
    _outcome: {type: GraphQLString},
    column: {type: GraphQLList(Column)}})});
  
  const Relation = new GraphQLObjectType({
     name: 'Relation',
     fields: () => ({
      _connection: {type: GraphQLString},
    _name: {type: GraphQLString},
    _table: {type: GraphQLString},
    _type: {type: GraphQLString},
    columns: {type: Columns} })});
  
  const Properties = new GraphQLObjectType({
     name: 'Properties',
     fields: () => ({
      _context: {type: GraphQLString, relation: Relation }})});
  
  const Object = new GraphQLObjectType({
     name: 'Object',
     fields: () => ({
      _caption: {type: GraphQLString}, _id: {type: GraphQLString}, properties: {type: Properties} })});
  
  const Objects = new GraphQLObjectType({
     name: 'Objects',
     fields: () => ({
      object: {type: Object} })});
  
  const FcpObjectModelEncapsulateLegacytrueobjectgraph = new GraphQLObjectType({
     name: 'FcpObjectModelEncapsulateLegacytrueobjectgraph',
     fields: () => ({
      objects: {type: Objects} })});
  
  const Semanticvalue = new GraphQLObjectType({
     name: 'Semanticvalue',
     fields: () => ({
      _key: {type: GraphQLString}, _value: {type: GraphQLString, }})});
  
  const Semanticvalues = new GraphQLObjectType({
     name: 'Semanticvalues',
     fields: () => ({
      semanticvalue: {type: Semanticvalue} })});
  
  const Layout = new GraphQLObjectType({
     name: 'Layout',
     fields: () => ({
    _dimordering: {type: GraphQLString},
    _measureordering: {type: GraphQLString},
    _showstructure: {type: GraphQLString, }})});
  
  const FcpObjectModelTableTypetruecolumn = new GraphQLObjectType({
     name: 'FcpObjectModelTableTypetruecolumn',
     fields: () => ({
      _caption: {type: GraphQLString},
    _datatype: {type: GraphQLString},
    _name: {type: GraphQLString},
    _role: {type: GraphQLString},
    _type: {type: GraphQLString, }})});
  
  const Aliases = new GraphQLObjectType({
     name: 'Aliases',
     fields: () => ({
      _enabled: {type: GraphQLString, }})});
  
  const Attribute = new GraphQLObjectType({
     name: 'Attribute',
     fields: () => ({
      _datatype: {type: GraphQLString, _name: {type: GraphQLString, }}})});
  
  const Attributes = new GraphQLObjectType({
     name: 'Attributes',
     fields: () => ({
      attribute: {type: GraphQLList(Attribute)} })});
  
  const Metadatarecord = new GraphQLObjectType({
     name: 'Metadatarecord',
     fields: () => ({
      remotename: {type: GraphQLString},
    remotetype: {type: GraphQLString},
    parentname: {type: GraphQLString},
    remotealias: {type: GraphQLString},
    aggregation: {type: GraphQLString},
    containsnull: {type: GraphQLString},
    _class: {type: GraphQLString},
    attributes: {type: Attributes} })});
  
  const Metadatarecords = new GraphQLObjectType({
     name: 'Metadatarecords',
     fields: () => ({
      metadatarecord: {type: GraphQLList(Metadatarecord)} })});
  
  const FcpObjectModelEncapsulateLegacytruerelation = new GraphQLObjectType({
     name: 'FcpObjectModelEncapsulateLegacytruerelation',
     fields: () => ({
      _connection: {type: GraphQLString},
    _name: {type: GraphQLString},
    _table: {type: GraphQLString},
    _type: {type: GraphQLString},
    columns: {type: Columns} })});
  
  const FcpObjectModelEncapsulateLegacyfalserelation = new GraphQLObjectType({
     name: 'FcpObjectModelEncapsulateLegacyfalserelation',
     fields: () => ({
      _connection: {type: GraphQLString},
    _name: {type: GraphQLString},
    _table: {type: GraphQLString},
    _type: {type: GraphQLString},
    columns: {type: Columns} })});
  
  const Connection = new GraphQLObjectType({
     name: 'Connection',
     fields: () => ({
      _class: {type: GraphQLString},
    _cleaning: {type: GraphQLString},
    _compat: {type: GraphQLString},
    _dataRefreshTime: {type: GraphQLString},
    _filename: {type: GraphQLString},
    _googleSheetId: {type: GraphQLString},
    _interpretationMode: {type: GraphQLString},
    _mimeType: {type: GraphQLString},
    _server: {type: GraphQLString},
    _serveroauth: {type: GraphQLString},
    _username: {type: GraphQLString},
    _validate: {type: GraphQLString, }})});
  
  const Namedconnection = new GraphQLObjectType({
     name: 'Namedconnection',
     fields: () => ({
      _caption: {type: GraphQLString, _name: {type: GraphQLString, connection: {type: Connection} }}})});
  
  const Namedconnections = new GraphQLObjectType({
     name: 'Namedconnections',
     fields: () => ({
      namedconnection: {type: Namedconnection} })});
  
  const Datasource = new GraphQLObjectType({
     name: 'Datasource',
     fields: () => ({
      _caption: {type: GraphQLString},
    _inline: {type: GraphQLString},
    _name: {type: GraphQLString},
    _version: {type: GraphQLString},
    _fcpObjectModelEncapsulateLegacytrueobjectgraph: {type: FcpObjectModelEncapsulateLegacytrueobjectgraph },
    semanticvalues: {type: Semanticvalues},
    layout: {type: Layout},
    _fcpObjectModelTableTypetruecolumn: {type: FcpObjectModelTableTypetruecolumn},
    aliases: {type: Aliases},
    connection: {type: Connection} })});
  
  const Preference = new GraphQLObjectType({
     name: 'Preference',
     fields: () => ({
      _name: {type: GraphQLString, _value: {type: GraphQLString, }}})});
  
  const Preferences = new GraphQLObjectType({
     name: 'Preferences',
     fields: () => ({
      preference: {type: GraphQLList(Preference)} })});
  
  const Documentformatchangemanifest = new GraphQLObjectType({
     name: 'Documentformatchangemanifest',
     fields: () => ({
      AutoCreateAndUpdateDSDPhoneLayouts: {type: GraphQLString},
    _fcpMarkAnimationtrueMarkAnimation: {type: GraphQLString},
    _fcpObjectModelEncapsulateLegacytrueObjectModelEncapsulateLegacy: {type: GraphQLString},
    _fcpObjectModelTableTypetrueObjectModelTableType: {type: GraphQLString},
    _fcpSchemaViewerObjectModeltrueSchemaViewerObjectModel: {type: GraphQLString},
    _fcpSetMembershipControltrueSetMembershipControl: {type: GraphQLString},
    SheetIdentifierTracking: {type: GraphQLString},
    WindowsPersistSimpleIdentifiers: {type: GraphQLString, }})});
  
  const WorkbookType = new GraphQLObjectType({
     name: 'workbook',
     fields: () => ({
      _xmlnsuser: {type: GraphQLString},
    _originalversion: {type: GraphQLString},
    _sourcebuild: {type: GraphQLString},
    _sourceplatform: {type: GraphQLString},
    _version: {type: GraphQLString},
    thumbnails: {type: Thumbnails },
    windows: {type: Windows },
    dashboards: {type: Dashboards },
    worksheets: {type: Worksheets },
    datasources: {type: Datasources },
    preferences: {type: Preferences },
    documentformatchangemanifest: {type: Documentformatchangemanifest } })});
  
  const TwbType = new GraphQLObjectType({
     name: 'twb',
     fields: () => ({
      workbook: {type: WorkbookType} })});
  

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        twb: {
            type: TwbType,
            description: 'Entire workbook',
            resolve: () => twb
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen(5000, () => console.log('server running'));