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
            <span>
                <b>{this.props.dirinfo.name}</b>
            </span>
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
        <div class="w3-half">
        <DirInfoRow dirinfo={this.props.dirinfos}/>

        <table ref={(ref) => this.myTable = ref} >
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

var DIRINFO= {name:'WestlifeVirtualFolder',size:1024};

ReactDOM.render(
    <FileManager files={FILES} dirinfos={DIRINFO}/>,
    document.getElementById('vffmcontainer')
);

