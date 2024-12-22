using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CarRentalSystem
{
    public partial class Return : Form
    {
        public Return()
        {
            InitializeComponent();
        }
        SqlConnection Con = new SqlConnection(@"Data Source=DESKTOP-6QEB6S6;Initial Catalog=CarRental;Persist Security Info=True;User ID=sa;Password=ker@4080");

        private void populate()
        {
            Con.Open();
            string query = "select * from RentalTbl";
            SqlDataAdapter da = new SqlDataAdapter(query, Con);
            SqlCommandBuilder builder = new SqlCommandBuilder(da);
            var ds = new DataSet();
            da.Fill(ds);
            RentalDGV.DataSource = ds.Tables[0];
            Con.Close();
        }
        private void populateReturn()
        {
            Con.Open();
            string query = "select * from ReturnTable";
            SqlDataAdapter da = new SqlDataAdapter(query, Con);
            SqlCommandBuilder builder = new SqlCommandBuilder(da);
            var ds = new DataSet();
            da.Fill(ds);
            returnDGV.DataSource = ds.Tables[0];
            Con.Close();
        }
        private void Return_Load(object sender, EventArgs e)
        {
            populate();
            populateReturn();
        }

        private void RentalDGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            idTb.Text = RentalDGV.SelectedRows[0].Cells[0].Value.ToString();
            carIDTb.Text = RentalDGV.SelectedRows[0].Cells[1].Value.ToString();
            CustnameTb.Text = RentalDGV.SelectedRows[0].Cells[5].Value.ToString();
            retunDate.Text = RentalDGV.SelectedRows[0].Cells[3].Value.ToString();
            DateTime d1 = retunDate.Value.Date;
            DateTime d2 = DateTime.Now;
            TimeSpan t = d2 - d1;
            int NrofDay = Convert.ToInt32(t.TotalDays);
            if (NrofDay <= 0)
            {
                delayTb.Text = "No Delay";
                finetb.Text = "No Fine";
            }
            else
            {
                delayTb.Text = "" + NrofDay;
                finetb.Text = "" + (NrofDay*250);
            }
        }

        private void label2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void DeleteRet()
        {
            int rentid;
            rentid = Convert.ToInt32(RentalDGV.SelectedRows[0].Cells[0].Value.ToString());
            Con.Open();
            string query = "delete from RentalTbl where Rentid = '" + idTb.Text + "';";
            SqlCommand cmd = new SqlCommand(query, Con);
            cmd.ExecuteNonQuery();
            MessageBox.Show("Deleted sucessfully !");
            Con.Close();
            populate();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // back button
            this.Hide();
            Mainfom m = new Mainfom();
            m.Show();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            // add button
            if (idTb.Text == " " || finetb.Text == "" || delayTb.Text == "" || CustnameTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "insert into ReturnTable values (" + idTb.Text + " , '" + CustnameTb.Text + "' ,'" + carIDTb.Text + "' , '" + finetb.Text + "' , '" + retunDate.Text + "' , '" + delayTb.Text + "' )";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Created sucessfully  !");
                    Con.Close();
                    populateReturn();
                    DeleteRet();

                    populateReturn();
                    DeleteRet();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void button5_Click(object sender, EventArgs e)
        {
            if (idTb.Text == " " || CustnameTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "delete from ReturnTable where ReturnId = '" + idTb.Text + "';";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Deleted sucessfully !");
                    Con.Close();
                    populateReturn();

                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }
    }
}
