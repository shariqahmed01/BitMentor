class Solution {
    public static void main(String[] args) {
        int[] nums = {2,2,1,1,3};
        System.out.println(singleNumber(nums));

    }
    public int singleNumber(int[] nums) {
        int result=nums[0];
        for(int i=1;i<nums.length;i++){
           result=result^nums[i];
        }
        return result;
    }
}