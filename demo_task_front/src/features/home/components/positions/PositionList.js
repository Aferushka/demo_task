import React from 'react';
import { getPositions } from '../../redux/reducer';
import { loadPositions } from '../../redux/actions/loadPositions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import PositionItem from './PositionItem';


export class PositionList extends React.Component {

  componentDidMount() {
    this.props.loadPositions()
  }

  render() {
    return (
        <div>
            <h1>Список позиций</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Наименование</TableCell>
                            <TableCell>Код ОКПД</TableCell>
                            <TableCell>Код ОКЕИ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.positions.map((position) => (
                            <PositionItem key={position.id} position={position}/>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

        </div>
    );
  }
};

const mapStateToProps = state => ({
  positions: getPositions(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadPositions: loadPositions
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PositionList);
