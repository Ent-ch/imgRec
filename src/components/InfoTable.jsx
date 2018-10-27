const InfoTable = ({ data: { timeFoto, tags }}) => <table className="g--8 card">
  <tr className="table-header">
    <td>Time foto</td>
    <td>Class</td>
    {/* <td>Nearest firestation</td> */}
  </tr>
  <tr>
    <td>{timeFoto}</td>
    <td>{tags}</td>
    {/* <td>12,1 km</td> */}
  </tr>
</table>;

export default InfoTable;
