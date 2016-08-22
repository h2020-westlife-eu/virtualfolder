/**
 * Created by Tomas Kulhanek on 8/9/16.
 * components
 * * Filemanager
 *   * FileTable
 *     * DirInfoRow
 *     * FileRow
 *   * CommandRow
 *   * HelpRow
 */

var FILETYPE = {
    directory:1,
    read:2,
    write:4
};
var DirInfoRow = React.createClass({
    render:function(){
        return (
            <b> {this.props.dirinfo.name} </b>
        )
    }
});

var FileTable = React.createClass({
    render:function(){
        var rows = [];
        var dir = this.props.dir;
        var dirinfo = {name: dir,size:0};

        /*this.props.files.forEach(function(afile){
            rows.push(<FileRow file={afile} key={afile.name}/>);
        });*/
        /*reference for further dynatable*/
        return (
        <div className="w3-half">
        <DirInfoRow dirinfo={dirinfo}/>

        <table ref={(ref) => this.myTable = ref} className="w3-table w3-striped w3-border w3-hoverable w3-small">
                <thead>
                <tr>
                    <th>name</th>
                    <th>size</th>
                    <th>date</th>
                </tr>
                </thead>
            </table>
            </div>
        )
    },

    /*integrate jQuery, dynatable into rendered table by REACT*/
    componentDidMount: function(){
        this.serverRequest = $.getJSON(FILESURL+this.props.dir, function (data) {
            console.log(data);
            //console.log(FILES2);
            jQuery(this.myTable).dynatable({
                features:{ paginate:false},
                dataset:{records:data}
            });
            //click on row will execute action
            jQuery(this.myTable).dynatable().on('click', 'tr', function() {
                console.log(this.textContent);
                // do stuff here
            });
        }.bind(this));
    }
});

var FileManager = React.createClass({
    render: function(){
        console.log("rendering react output");
        return (
            <div>
                <FileTable dir={this.state.leftdir} />
                <FileTable dir={this.state.rightdir} />
            </div>
        );
    },
    getInitialState: function(){
        return{
            leftdir:"",
            rightdir:""
        }
    }
});

var FILES = [];/*[
    {name:'..', size:0,time:'2016-08-07T9:50', filetype:7},
    {name:'PDB', size:0,time:'2016-08-07T9:50', filetype:7},
    {name:'2hhd.pdb', size:3648,time:'2016-08-07T9:50', filetype:6},
    {name:'1dtu.pdb', size:14234241,time:'2016-08-07T9:50', filetype:6},
    {name:'5ire.pdb', size:1576573,time:'2016-08-07T9:50', filetype:6}
];*/
var FILES2 = [
    {name:'..', size:0,time:'2016-08-07T9:50', filetype:7},
    {name:'RAW', size:0,time:'2016-08-07T9:50', filetype:7},
    {name:'4hhd.pdb', size:3648,time:'2016-08-07T9:50', filetype:6},
    {name:'4dtu.pdb', size:14234241,time:'2016-08-07T9:50', filetype:6},
    {name:'4ire.pdb', size:1576573,time:'2016-08-07T9:50', filetype:6},
    {name:'5hhd.pdb', size:3648,time:'2016-08-07T9:50', filetype:6},
    {name:'5dtu.pdb', size:14234241,time:'2016-08-07T9:50', filetype:6},
    {name:'5ire.pdb', size:1576573,time:'2016-08-07T9:50', filetype:6}
];

var DIRINFO= {};/*name:'WestlifeVirtualFolder',size:1024};*/
var DIRINFO2= {};/*name:'WestlifeVirtualFolder2',size:1024};*/

//states for left and right panel
var DIRLEFT="";
var DIRRIGHT="";

var FILESURL="/metadataservice/sbfiles/"

ReactDOM.render(
    <FileManager />,
    document.getElementById('vffmcontainer')
);

