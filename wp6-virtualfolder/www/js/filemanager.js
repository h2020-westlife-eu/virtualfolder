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
var FileRow = React.createClass({
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

var DirInfoRow = React.createClass({
    render:function(){
        return (
            <tr>
                <td>{this.props.dirinfo.name}</td>
            </tr>
        )
    }
});

var FileTable = React.createClass({
    render:function(){
        var rows = [];

        this.props.files.forEach(function(afile){
            rows.push(<FileRow file={afile} key={afile.name}/>);
        });
        return (
            <table>
                <thead>
                <DirInfoRow dirinfo={this.props.dirinfos}/>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
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
   }
});

var FILES = [
    {name:'..', size:'UP-DIR',time:'2016-08-07T9:50', filetype:7},
    {name:'PDB', size:'DIR',time:'2016-08-07T9:50', filetype:7},
    {name:'2hhd.pdb', size:3648,time:'2016-08-07T9:50', filetype:6},
    {name:'1dtu.pdb', size:14234241,time:'2016-08-07T9:50', filetype:6},
    {name:'5ire.pdb', size:1576573,time:'2016-08-07T9:50', filetype:6}
];

var DIRINFO= {name:'WestlifeVirtualFolder',size:1024};

ReactDOM.render(
    <FileManager files={FILES} dirinfos={DIRINFO}/>,
    document.getElementById('vffmcontainer')
);

