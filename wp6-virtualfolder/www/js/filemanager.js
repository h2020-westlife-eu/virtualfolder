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
/*var FileRow = React.createClass({
    render:function(){
        var name = (this.props.file.type & FILETYPE.directory) ?
            <b> {this.props.file.name} </b> :
            this.props.file.name;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.file.size}</td>
                <td>{this.props.file.time}</td>
            </tr>
        );
    }
});
*/
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

        /*this.props.files.forEach(function(afile){
            rows.push(<FileRow file={afile} key={afile.name}/>);
        });*/
        /*reference for further dynatable*/
        return (
        <div className="w3-half">
        <DirInfoRow dirinfo={this.props.dirinfos}/>

        <table ref={(ref) => this.myTable = ref} className="w3-table w3-striped w3-border w3-hoverable w3-small">
                <thead>
                <tr>
                    <th>name</th>
                    <th>size</th>
                    <th>time</th>
                </tr>
                </thead>
            </table>
            </div>
        )
    },
    /*integrate jQuery, dynatable into rendered table by REACT*/
    componentDidMount: function(){

        jQuery(this.myTable).dynatable({
            features:{ paginate:false},
            dataset:{records:this.props.files}
        });

        jQuery(this.myTable).dynatable().on('click', 'tr', function() {
            console.log(this.textContent);
            // do stuff here
        });
    }
});

var FileManager = React.createClass({
    render: function(){
        console.log("rendering react output");
        return (
            <div>
                <FileTable files={this.props.files} dirinfos={this.props.dirinfos}/>
                <FileTable files={this.props.files2} dirinfos={this.props.dirinfos2}/>
            </div>
        );
    },

});

var FILES = [
    {name:'..', size:0,time:'2016-08-07T9:50', filetype:7},
    {name:'PDB', size:0,time:'2016-08-07T9:50', filetype:7},
    {name:'2hhd.pdb', size:3648,time:'2016-08-07T9:50', filetype:6},
    {name:'1dtu.pdb', size:14234241,time:'2016-08-07T9:50', filetype:6},
    {name:'5ire.pdb', size:1576573,time:'2016-08-07T9:50', filetype:6}
];
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

var DIRINFO= {name:'WestlifeVirtualFolder',size:1024};
var DIRINFO2= {name:'WestlifeVirtualFolder2',size:1024};

ReactDOM.render(
    <FileManager files={FILES} dirinfos={DIRINFO} files2={FILES2} dirinfos2={DIRINFO2}/>,
    document.getElementById('vffmcontainer')
);
