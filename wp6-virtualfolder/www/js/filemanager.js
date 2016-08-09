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

var FileRow = React.createClass({
    render:function(){
        var name = this.props.file.directory ?
            <b>{this.props.file.name}</b> :
            {this.props.file.name};
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
})

var FileTable